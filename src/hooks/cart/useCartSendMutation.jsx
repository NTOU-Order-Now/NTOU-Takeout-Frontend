import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendCart } from "@/api/cart/sendCart.js";
import { useRef } from "react";
import { useWebSocketContext } from "@/context/WebSocketContextProvider.jsx";

export const useCartSendMutation = () => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);
    const {
        mutateAsync: sendCartAsync,
        isPending: sendCartIsPending,
        isSuccess: sendCartIsSuccess,
        error: sendCartError,
    } = useMutation({
        mutationFn: async (payload) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            const res = await sendCart(
                payload,
                abortControllerRef.current.signal,
            );

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
            return res.data;
        },
        // optimistic update
        onMutate: async () => {
            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);

            const newCart = previousCart
                ? { ...previousCart }
                : { orderedDishes: [] };
            if (!newCart.orderedDishes) {
                newCart.orderedDishes = [];
            }

            queryClient.setQueryData(["cart"], newCart);
            // return previous cart for rollback
            return { previousCart };
        },
        onError: (error, variables, context) => {
            // rollback to previous cart
            if (context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart);
            }
            // Alert error message
            alert("訂單送出失敗，請重整頁面後再試試");
            throw error;
        },
        onSettled: () => {
            // finish or error refetch cart
            console.debug("useCartAddMutation onSettled");
            queryClient.invalidateQueries(["cart"]);
        },
    });

    return {
        sendCartAsync,
        sendCartError,
        sendCartIsPending,
        sendCartIsSuccess,
    };
};
