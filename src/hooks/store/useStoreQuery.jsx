import { useQuery } from "@tanstack/react-query";
import { getStoreData } from "../../api/store/getStoreData.js";

export const useStoreQuery = (storeIdList) => {
    const {
        data: storeData,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["store", storeIdList],
        queryFn: ({ signal }) => getStoreData(storeIdList, signal),
        enabled: storeIdList.length > 0,
        staleTime: 15 * 60 * 1000, // 15 minutes
    });
    return { storeData, isLoading, isError, refetch };
};
