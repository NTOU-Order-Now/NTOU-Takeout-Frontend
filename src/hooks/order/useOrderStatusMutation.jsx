import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../../api/order/updateOrderStatus.js";
import { useRef } from "react";

export const useOrderStatusMutation = () => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);

    const {
        mutateAsync: updateOrderStatusAsync,
        isError,
        error,
        isLoading,
    } = useMutation({
        mutationFn: async ({ orderId, newStatus }) => {
            // Cancel previous request if exists
            if (abortControllerRef.current) {
                console.debug("Abort previous updateOrderStatus request");
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            const res = await updateOrderStatus(
                orderId,
                newStatus,
                controller.signal,
            );

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            return res;
        },
        // Optimistic update
        onMutate: async ({ orderId, newStatus }) => {
            // Cancel any outgoing refetches to avoid overwriting optimistic update
            await queryClient.cancelQueries(["orders"]);

            // Snapshot the previous value
            const previousOrders = queryClient.getQueryData(["orders"]);

            // Find which pages contain the order we're updating
            const updatedPages = previousOrders?.pages.map((page) => {
                return page.map((order) =>
                    order.id === orderId
                        ? {
                              ...order,
                              status: newStatus,
                              // if it's accepting order, update the order's acceptTime
                              ...(newStatus === "PROCESSING" && {
                                  acceptTime: new Date()
                                      .toISOString()
                                      .replace("T", " ")
                                      .slice(0, 19),
                              }),
                          }
                        : order,
                );
            });

            // Optimistically update to the new value
            if (updatedPages) {
                queryClient.setQueryData(["orders"], (old) => ({
                    ...old,
                    pages: updatedPages,
                }));
            }

            // Return a context object with the snapshotted value
            return { previousOrders };
        },
        // If mutation fails, use the context returned from onMutate to roll back
        onError: (err, newOrder, context) => {
            if (context?.previousOrders) {
                queryClient.setQueryData(["orders"], context.previousOrders);
            }

            alert("更新訂單狀態失敗，請稍後再試");
            console.error("Update order status error:", err);
        },
        // Always refetch after error or success
        onSettled: () => {
            console.debug("updateOrderStatusAsync onSettled");
            queryClient.invalidateQueries(["orders"]);
        },
    });

    return {
        updateOrderStatusAsync,
        isError,
        error,
        isLoading,
    };
};
