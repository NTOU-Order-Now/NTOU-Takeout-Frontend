import { useQuery } from "@tanstack/react-query";
import { getStoreDataById } from "@/api/store/getStoreDataById.js";

export const useStoreQuery = (storeIdList, isEnable = true) => {
    const {
        data: storeData,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["storeData", storeIdList],
        queryFn: async ({ signal }) => {
            const res = await getStoreDataById(storeIdList, signal);
            return res.data;
        },
        enabled: !!storeIdList?.[0] && isEnable,
        staleTime: 15 * 60 * 1000, // 15 minutes
    });
    return { storeData, isLoading, isError, refetch };
};
