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

            return updateData.category;
        },
        onMutate: async (updateData) => {
            console.debug("updateDish", updateData);
            const { category, id } = updateData;
            console.debug("category", category);
            // Cancel any outgoing refetches
            await queryClient.cancelQueries(["categoryDishes", category]);

            // Snapshot the previous value
            const previousDishes = queryClient.getQueryData([
                "categoryDishes",
                category,
            ]);

            // Optimistically update the dish
            queryClient.setQueryData(["categoryDishes", category], {
                categoryName: category,
                dishes: previousDishes.dishes.map((dish) =>
                    dish.id === id ? updateDish : dish,
                ),
            });

            return { previousDishes, category };
        },
        onError: (err, newDish, context) => {
            console.debug("error", newDish, context);
            if (context?.previousDishes) {
                queryClient.setQueryData(
                    ["categoryDishes", context.category],
                    context.previousDishes,
                );
            }
            alert("更新錯誤，請確保所有欄位都不為空");
            console.error("Update dish error:", err);
        },
        onSettled: (category) => {
            console.debug("variables", category);
            queryClient.invalidateQueries(["categoryDishes", category]);
            // queryClient.invalidateQueries(["menuCategoryList", menuId]);
        },
    });
    return {
        updateDish,
        isError,
        isPending,
    };
};
