import { useInfiniteQuery } from "@tanstack/react-query";
import { getStoreDataByParams } from "@/api/store/getStoreDataByParams.js";

export const useStoreInfiniteQuery = (keyword, sortBy, sortDir, size) => {
    const {
        data: storeData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ["storeData", keyword, sortBy, sortDir],
        queryFn: async ({ pageParam }) => {
            const response = await getStoreDataByParams(
                keyword,
                sortBy,
                sortDir,
                pageParam,
                size,
            );
            return response.data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            // console.debug("lastPage", lastPage);
            return lastPage.currentPage < lastPage.totalPages
                ? lastPage.currentPage + 1
                : undefined;
        },
        staleTime: 1000 * 60, // 1 minute
    });

    return {
        storeData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    };
};
