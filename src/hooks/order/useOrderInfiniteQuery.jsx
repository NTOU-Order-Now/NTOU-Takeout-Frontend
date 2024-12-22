import { useInfiniteQuery } from "@tanstack/react-query";
import { searchOrder } from "../../api/order/searchOrder.js";

export const useOrderInfiniteQuery = (status) => {
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
            console.log(response.data);
            return response.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            // Assuming your API returns total pages info
            // console.debug("allPage", allPages[0]);
            // console.debug(lastPage, allPages);
            const currentPage = lastPage.currentPage;
            return currentPage < lastPage.totalPages - 1
                ? currentPage + 1
                : undefined;
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
