import { useQueries } from "@tanstack/react-query";
import { getDishsByCategory } from "../../api/menu/getDishsByCategory.js";

export const useCategoryQueries = (categories, menuId, isEnable) => {
    return useQueries({
        queries: categories.map((category) => ({
            queryKey: ["categoryDishes", category.categoryName],
            queryFn: async ({ signal }) => {
                const dishDetails = await getDishsByCategory(
                    menuId,
                    category.categoryName,
                    signal,
                );
                return {
                    categoryName: category.categoryName,
                    dishes: dishDetails,
                };
            },
            enabled:
                !!categories &&
                !!menuId &&
                category.dishIds.length > 0 &&
                isEnable,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        })),
        combine: (results) => ({
            categoryData: results.map((result) => result.data).filter(Boolean),
            isQueriesSuccess: results.every((result) => result.isSuccess),
        }),
    });
};
