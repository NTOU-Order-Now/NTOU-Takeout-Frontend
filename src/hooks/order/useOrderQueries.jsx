import { useInfiniteQuery } from "@tanstack/react-query";
import { searchOrder } from "../../api/order/searchOrder.js";

export const useOrderQueries = (status) => {
    const PAGE_SIZE = 3;
    const {
        data: orders,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["orders", status],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await searchOrder({
                page: pageParam,
                size: PAGE_SIZE,
                status: status,
            });
            console.debug("response", response.data);
            return response.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            // Assuming your API returns total pages info
            const currentPage = allPages.length - 1;
            return lastPage.length === PAGE_SIZE ? currentPage + 1 : undefined;
        },
        staleTime: 1000 * 60, // 1 minute
    });

    return {
        orders,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    };
};
