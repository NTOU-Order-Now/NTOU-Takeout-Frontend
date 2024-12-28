import { useQuery } from "@tanstack/react-query";
import { getStatistic } from "../../api/statistic/getStatistic.js";

export const useStatisticQuery = (menuId, category) => {
    return useQuery({
        queryKey: ["dishSales", menuId, category],
        queryFn: ({ signal }) => getStatistic(menuId, category, signal),
        enabled: !!menuId && !!category,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
