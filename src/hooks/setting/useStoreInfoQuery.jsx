import { useQuery } from "@tanstack/react-query";
import { getStoreInfo } from "../../api/pos/setting/getStoreInfo.js";

export const useStoreInfoQuery = (storeId, isEnable = true) => {
    const {
        data: storeInfo,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["storeInformation", storeId],
        queryFn: async ({ signal }) => {
            const res = await getStoreInfo(storeId, signal);
            return res;
        },
        enabled: !!storeId && isEnable,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10, // 10 分鐘
    });

    return {
        storeInfo,
        isLoading,
        error,
        isError,
    };
};
