import { useQueries } from "@tanstack/react-query";
import { getStatistic } from "../../api/statistic/getStatistic.js";

export const useAllCategoriesStatistic = (menuId, categories) => {
    return useQueries({
        queries: categories.map((category) => ({
            queryKey: ["dishSales", menuId, category.categoryName],
            queryFn: async ({ signal }) => {
                return await getStatistic(
                    menuId,
                    category.categoryName,
                    signal,
                );
            },
            enabled: !!menuId && !!categories,
            staleTime: 5 * 60 * 1000,
        })),
        combine: (results) => {
            const successfulResults = results.filter(
                (result) => result.isSuccess && result.data,
            );
            return {
                allData: successfulResults.map((result) => result.data.data),
                isQueriesSuccess: results.every((result) => result.isSuccess),
                isLoading: results.some((result) => result.isLoading),
                isError: results.some((result) => result.isError),
                error: results.find((result) => result.error)?.error,
            };
        },
    });
};
