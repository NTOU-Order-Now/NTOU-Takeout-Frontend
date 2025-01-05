import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { getNewDish } from "../../api/pos/menu/getNewDish.js";

export const useCreateDishMutation = (menuId) => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);
    const defaultCategory = "";

    const {
        mutateAsync: createDish,
        isError,
        isPending,
    } = useMutation({
        mutationFn: async () => {
            // Cancel any existing request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;
            const res = await getNewDish(menuId, controller.signal);

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            return res;
        },
        onMutate: async () => {
            await queryClient.cancelQueries([
                "categoryDishes",
                defaultCategory,
            ]);

            const previousDishes = queryClient?.getQueryData([
                "categoryDishes",
                defaultCategory,
            ]);

            const tempDish = {
                id: `temp-${Date.now()}`, // temp-id
                name: "",
                description: "",
                picture: "",
                price: null,
                category: defaultCategory,
                salesVolume: 0,
                dishAttributes: [],
            };
            queryClient.setQueryData(
                ["categoryDishes", defaultCategory],

                {
                    categoryName: "",
                    dishes: previousDishes
                        ? [previousDishes.dishes, tempDish]
                        : [tempDish],
                },
            );
            return { previousDishes };
        },
        onError: (err, dishId, context) => {
            if (context?.previousDishes) {
                queryClient.setQueryData(
                    ["categoryDishes", defaultCategory],
                    context.previousDishes,
                );
            } else {
                queryClient.setQueryData(
                    ["categoryDishes", defaultCategory],
                    [],
                );
            }
            alert("創建失敗，請重整頁面再試一次");
            console.error("Create new dish error:", err);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["menuCategoryList", menuId]);
            queryClient.invalidateQueries(["categoryDishes"], defaultCategory);
        },
    });
    return {
        createDish,
        isError,
        isPending,
    };
};
