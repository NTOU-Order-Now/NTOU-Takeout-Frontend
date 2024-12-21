import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { putDish } from "../../api/pos/menu/putDish.js";

export const useUpdateDishMutation = (menuId) => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);
    const {
        mutateAsync: updateDish,
        isError,
        isPending,
    } = useMutation({
        mutationFn: async (updateData) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            const res = await putDish(
                { menuId, ...updateData },
                controller.signal,
            );

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            return res;
        },
        onMutate: async (updateData) => {
            const { dishId, category } = updateData;

            // Cancel any outgoing refetches
            await queryClient.cancelQueries(["categoryDishes", category]);

            // Snapshot the previous value
            const previousDishes = queryClient.getQueryData([
                "categoryDishes",
                category,
            ]);

            // Optimistically update the dish
            queryClient.setQueryData(["categoryDishes", category], (old) => {
                if (!old) return old;
                return old.map((dish) =>
                    dish.id === dishId ? { ...dish, ...updateData } : dish,
                );
            });

            return { previousDishes, category };
        },
        onError: (err, newDish, context) => {
            if (context?.previousDishes) {
                queryClient.setQueryData(
                    ["categoryDishes", context.category],
                    context.previousDishes,
                );
            }
            console.error("Update dish error:", err);
        },
        onSettled: (_, __, variables) => {
            queryClient.invalidateQueries([
                "categoryDishes",
                variables.category,
            ]);
            queryClient.invalidateQueries(["menuCategoryList", menuId]);
        },
    });
    return {
        updateDish,
        isError,
        isPending,
    };
};
