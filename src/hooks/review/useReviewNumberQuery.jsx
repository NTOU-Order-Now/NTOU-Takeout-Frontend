import { useQuery } from "@tanstack/react-query";
import { getReviewNumber } from "@/api/review/getReviewNumber.js";

export const useReviewNumberQuery = (storeId, isEnable = true) => {
    const {
        data: reviewNumberData,
        refetch,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["reviewNumberData", storeId],
        queryFn: async ({ signal }) => {
            return await getReviewNumber(storeId, signal);
        },

        enabled: !!storeId && isEnable,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 ** 10, //10 min
    });

    return { reviewNumberData, refetch, isLoading, isError };
};
