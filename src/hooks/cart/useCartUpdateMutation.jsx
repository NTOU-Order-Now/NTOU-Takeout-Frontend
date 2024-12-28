import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCart } from "../../api/cart/patchCart";
import { useRef } from "react";
export const useCartUpdateMutation = () => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);

    const {
        mutateAsync: patchCartAsync,
        onError: patchCartError,
        onMutate: patchCartOnMutate,
        isError: ispatchCartError,
    } = useMutation({
        mutationFn: async ({ orderedDishId, newQuantity }) => {
            if (abortControllerRef.current) {
                console.debug("Abort previous patchCart request");
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;
            const payload = {
                quantity: newQuantity.toString(),
            };
            const res = await patchCart(
                orderedDishId,
                payload,
                abortControllerRef.current.signal,
            );

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            return res;
        },
        // optimistic update
        onMutate: async ({ orderedDishId, newQuantity }) => {
            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);

            // optimistic update
            const newCart = previousCart
                ? { ...previousCart }
                : { orderedDishes: [] };
            if (!newCart.orderedDishes) {
                newCart.orderedDishes = [];
            }

            //if new quantity is 0, remove the dish from cart
            if (newQuantity === 0) {
                newCart.orderedDishes = newCart.orderedDishes.filter(
                    (dish) => dish.id !== orderedDishId,
                );
            } else {
                // update quantity
                newCart.orderedDishes = newCart.orderedDishes.map((dish) =>
                    dish.id === orderedDishId
                        ? { ...dish, quantity: newQuantity }
                        : dish,
                );
            }

            queryClient.setQueryData(["cart"], newCart);

            // return previous cart for rollback
            return { previousCart };
        },
        onError: (error, variables, context) => {
            // rollback to previous cart
            if (context?.previousCart) {
                console.debug("rollback to previous cart", context);
                queryClient.setQueryData(["cart"], context.previousCart);
            }
            // Alert error message
            alert("更新數量失敗，請稍後再試");
            throw error;
        },
        onSettled: () => {
            // finish or error refetch cart
            console.debug("patchCartAsync onSettled");
            queryClient.invalidateQueries(["cart"]);
        },
    });

    return {
        patchCartAsync,
        patchCartError,
        patchCartOnMutate,
        ispatchCartError,
    };
};
