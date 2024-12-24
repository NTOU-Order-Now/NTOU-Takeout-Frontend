import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCart } from "../../api/cart/postCart";
import { useRef } from "react";
export const useCartAddMutation = () => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);

    const {
        mutateAsync: postCartAsync,
        onError: postCartError,
        onMutate: postCartOnMutate,
        isError: postCartIsError,
    } = useMutation({
        mutationFn: async (payload) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            const res = await postCart(abortControllerRef.current.signal, payload);

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
            return res;

        },
        // optimistic update
        onMutate: async (payload) => {

            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);

            const newCart = previousCart ? { ...previousCart } : { orderedDishes: [] };
            if (!newCart.orderedDishes) {
                newCart.orderedDishes = [];
            }

            // find existing dish in cart
            const existingDishIndex = newCart.orderedDishes.findIndex(
                (dish) => dish.dishId === payload.dishId && dish.chosenAttributes === payload.chosenAttributes
            );

            if (existingDishIndex > -1) {
                // if exist, update quantity
                const existingDish = newCart.orderedDishes[existingDishIndex];
                newCart.orderedDishes = [
                    ...newCart.orderedDishes.slice(0, existingDishIndex),
                    {
                        ...existingDish,
                        quantity: existingDish.quantity + payload.quantity,
                        note: payload.note || existingDish.note,

                    },
                    ...newCart.orderedDishes.slice(existingDishIndex + 1),
                ];
            } else {
                //if not exist, add new dish
                newCart.orderedDishes.push({
                    id: crypto.randomUUID(), // temporary id
                    dishId: payload.dishId,
                    dishName: payload.dishName,
                    price: payload.price,
                    quantity: payload.quantity,
                    note: payload.note || "",
                    chosenAttributes: payload.chosenAttributes || [],
                    storeId: payload.storeId,
                });
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
            alert("新增購物車失敗，請稍後再試");
            throw error;
        },
        onSettled: () => {
            // finish or error refetch cart
            console.debug("patchCartAsync onSettled");
            queryClient.invalidateQueries(["cart"]);
        },

    });

    return {
        postCartAsync,
        postCartError,
        postCartOnMutate,
        postCartIsError,
    };
}
