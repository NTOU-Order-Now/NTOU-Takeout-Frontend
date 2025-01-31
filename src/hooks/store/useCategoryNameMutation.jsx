import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { patchCategoryName } from "@/api/pos/menu/patchCategoryName.js";

export const useCategoryNameMutation = (menuId) => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);

    const {
        mutateAsync: changeCategoryName,
        isError,
        isPending,
    } = useMutation({
        mutationFn: async ({ oldCategoryName, newCategoryName }) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            const result = await patchCategoryName(
                menuId,
                oldCategoryName,
                newCategoryName,
                controller.signal,
            );

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            return {
                oldCategoryName,
                newCategoryName,
                result,
            };
        },
        onMutate: async ({ oldCategoryName, newCategoryName }) => {
            // await Promise.all([
            //     queryClient.cancelQueries(["menuCategoryList", menuId]),
            //     queryClient.cancelQueries(["categoryDishes", oldCategoryName]),
            // ]);

            // keep previous state
            const previousMenuCategoryList = queryClient.getQueryData([
                "menuCategoryList",
                menuId,
            ]);
            //for every Dishes change category name
            const previousCategoryDishes = queryClient.getQueryData([
                "categoryDishes",
                oldCategoryName,
            ]);

            queryClient.setQueryData(
                ["menuCategoryList", menuId],
                previousMenuCategoryList.map((category) =>
                    category.categoryName === oldCategoryName
                        ? { ...category, categoryName: newCategoryName }
                        : category,
                ),
            );

            if (previousCategoryDishes) {
                // remove old status
                // queryClient.removeQueries(["categoryDishes", oldCategoryName]);
                //set new status
                queryClient.setQueryData(["categoryDishes", newCategoryName], {
                    categoryName: newCategoryName,
                    dishes: previousCategoryDishes.dishes.map((dish) => ({
                        ...dish,
                        category: newCategoryName,
                    })),
                });
            }

            return {
                previousMenuCategoryList,
                previousCategoryDishes,
                oldCategoryName,
            };
        },
        onError: (error, variables, context) => {
            console.debug("varoables", variables, context);
            if (context?.previousMenuCategoryList) {
                queryClient.setQueryData(
                    ["menuCategoryList", menuId],
                    context.previousMenuCategoryList,
                );
            }

            if (context?.previousCategoryDishes) {
                queryClient.setQueryData(
                    ["categoryDishes", context.oldCategoryName],
                    context.previousCategoryDishes,
                );
                queryClient.removeQueries([
                    "categoryDishes",
                    variables.newCategoryName,
                ]);
            }
            alert("更新錯誤，請重整頁面後再試");
            console.error("Update category name error:", error);
        },
        onSettled: (data) => {
            queryClient.invalidateQueries(["menuCategoryList", menuId]);
            if (data) {
                queryClient.invalidateQueries([
                    "categoryDishes",
                    data.oldCategoryName,
                ]);
                queryClient.invalidateQueries([
                    "categoryDishes",
                    data.newCategoryName,
                ]);
            }
        },
    });
    return {
        changeCategoryName,
        isError,
        isPending,
    };
};
