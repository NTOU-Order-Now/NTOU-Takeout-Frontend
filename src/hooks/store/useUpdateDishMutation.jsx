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
            console.debug;
            const { category } = updateData;

            // Cancel any outgoing refetches
            await queryClient.cancelQueries(["categoryDishes", category]);

            // Snapshot the previous value
            const previousDishes = queryClient.getQueryData([
                "categoryDishes",
                category,
            ]);

            // Optimistically update the dish
            queryClient.setQueryData(["categoryDishes", category], {
                previousDishes,
                dishes: updateData,
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
            alert("更新錯誤，請重整頁面後再試一次");
            console.error("Update dish error:", err);
        },
        onSettled: (variables) => {
            console.debug("variables", variables);
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
