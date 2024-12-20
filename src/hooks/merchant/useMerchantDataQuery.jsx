import { useQuery } from "@tanstack/react-query";
import getStoreClient from "../../api/store/getStoreClient";
export const useMerchantDataQuery = (merchantId, isEnable = true) => {
    const {
        data: merchantData,
        isLoading: isMerchantLoading,
        isError,
        error,
        refetch: refetchMerchantData,
    } = useQuery({
        queryKey: ["menuCategoryList", merchantId],
        queryFn: async () => {
            const res = await getStoreClient.getMerchantsByIdList([merchantId]);
            return res.data[0];
        },
        enabled: merchantId !== undefined && isEnable,
        refetchOnWindowFocus: false,
    });
    return {
        merchantData,
        isMerchantLoading,
        isError,
        error,
        refetchMerchantData,
    };
};
