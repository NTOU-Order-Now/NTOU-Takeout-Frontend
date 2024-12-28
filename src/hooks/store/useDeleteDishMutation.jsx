import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { deleteDish } from "../../api/pos/menu/deleteDish.js";
export const useDeleteDishMutation = (menuId) => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);

    const {
        mutateAsync: deleteMenuDish,
        isError,
        isPending,
    } = useMutation({
        mutationFn: async ({ dishId, categoryName }) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            const res = await deleteDish(menuId, dishId, controller.signal);

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            return res;
        },
        onMutate: async ({ dishId, categoryName }) => {
            await queryClient.cancelQueries(["categoryDishes", categoryName]);

            const previousDishes = queryClient.getQueryData([
                "categoryDishes",
                categoryName,
            ]);

            queryClient.setQueryData(["categoryDishes", categoryName], {
                previousDishes,
                dishes: previousDishes.dishes.filter(
                    (dish) => dish.id !== dishId,
                ),
            });

            return { previousDishes, categoryName };
        },
        onError: (err, variables, context) => {
            if (context?.previousDishes) {
                queryClient.setQueryData(
                    ["categoryDishes", context.categoryName],
                    context.previousDishes,
                );
            }
            alert("刪除失敗，請重整頁面後再試一次");
            console.error("Delete dish error:", err);
        },
        onSettled: (_, __, variables) => {
            queryClient.invalidateQueries([
                "categoryDishes",
                variables.categoryName,
            ]);
            queryClient.invalidateQueries(["menuCategoryList", menuId]);
        },
    });
    return {
        deleteMenuDish,
        isError,
        isPending,
    };
};
