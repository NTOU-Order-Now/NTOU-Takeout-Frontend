import { useInfiniteQuery } from "@tanstack/react-query";
import { getReviewByParams } from "@/api/review/getReviewByParams.js";

export const useReviewInfiniteQueries = (storeId, size) => {
    const {
        data: reviews,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["reviews", storeId],
        queryFn: async ({ pageParam }) => {
            const response = await getReviewByParams(storeId, pageParam, size);
            return response.data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            // console.debug("lastPage", lastPage);
            return lastPage.currentPage < lastPage.totalPages
                ? lastPage.currentPage + 1
                : undefined;
        },
        staleTime: 1000 * 60 * 10, // 10 minute
    });

    return {
        reviews,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    };
};
