import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "@/api/order/updateOrderStatus.js";
import { useRef } from "react";

export const useOrderStatusMutation = (pageId) => {
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

            return { orderId, newStatus };
        },
        // Optimistic update
        onMutate: async ({ orderId, newStatus }) => {
            const status = newStatus === "PROCESSING" ? "PENDING" : "ALL";
            // Cancel any outgoing, refetches to avoid overwriting optimistic update
            await queryClient.cancelQueries(["orders", status, pageId]);
            // Snapshot the previous value
            const previousOrders = queryClient.getQueryData([
                "orders",
                status,
                pageId,
            ]);
            // console.debug("previousOrders", previousOrders);
            // Find which pages contain the order we're updating
            const updatedPages = previousOrders?.content.map((order) =>
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
            // console.debug("updatedPages", updatedPages);

            // // Optimistically update to the new value
            if (updatedPages) {
                queryClient.setQueryData(["orders", status, pageId], {
                    previousOrders,
                    content: updatedPages,
                });
            }

            // Return a context object with the snapshotted value
            return { previousOrders };
        },
        // If mutation fails, use the context returned from onMutate to roll back
        onError: (err, newOrder, context) => {
            const status =
                newOrder.newStatus === "PROCESSING" ? "PENDING" : "ALL";
            console.debug("newOrder", newOrder, "context", context);
            if (context?.previousOrders) {
                queryClient.setQueryData(
                    ["orders", status, pageId],
                    context.previousOrders,
                );
            }

            // alert("更新訂單狀態失敗，請稍後再試");
            console.error("Update order status error:", err);
        },
        // Always refetch after error or success
        onSettled: ({ newStatus }) => {
            const status = newStatus === "PROCESSING" ? "PENDING" : "ALL";
            console.debug("updateOrderStatusAsync onSettled");
            queryClient.invalidateQueries(["orders", status, pageId]);
        },
    });

    return {
        updateOrderStatusAsync,
        isError,
        error,
        isLoading,
    };
};
