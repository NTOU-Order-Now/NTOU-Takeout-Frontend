import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCart } from "../../api/cart/deleteCart";
import { useCartAddMutation } from "./useCartAddMutation";
import { useRef } from "react";
export const useCartDeleteMutation = () => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);
    const { postCartAsync } = useCartAddMutation();
    const {
        mutateAsync: deleteCartAsync,
        onError: deleteCartError,
        onSuccess: deleteCartSuccess,
        onMutate: deleteCartOnMutate,
        isError: deleteCartIsError,
    } = useMutation({
        //payload: given after delete cart, add back the dish to cart
        mutationFn: async (payload) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            await deleteCart(abortControllerRef.current.signal);

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
            //return for onsuccess to add back to cart
            return payload;

        },
        // optimistic update
        onMutate: async () => {
            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);
            const newCart = previousCart ? { ...previousCart } : { orderedDishes: [] };
            if (!newCart.orderedDishes) {
                newCart.orderedDishes = [];
            }
            newCart.cost = 0;
            newCart.orderedDishes = [];
            newCart.storeId = undefined;
            console.debug("previousCart", previousCart);
            queryClient.setQueryData(["cart"], []);

            // return previous cart for rollback
            return { previousCart };
        },
        onSuccess: (payload) => {
            //handle add back to cart
            postCartAsync(payload);
        },
        onError: (error, variables, context) => {
            // rollback to previous cart
            if (context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart);
            }
            // Alert error message
            alert("刪除購物車失敗，請稍後再試");
            throw error;
        },
        onSettled: () => {
            // finish or error refetch cart
            console.debug("deleteCartAsync onSettled");
            queryClient.invalidateQueries(["cart"]);
        },

    });

    return {
        deleteCartAsync,
        deleteCartSuccess,
        deleteCartError,
        deleteCartOnMutate,
        deleteCartIsError,
    };
}
