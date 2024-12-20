import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../api/user/getUserInfo.js";
export const useUserInfoQuery = (isEnable) => {
    const {
        data: userInfo,
        isLoading: isUserInfoLoading,
        isError: isUserInfoError,
        error,
        refetch: refetchUserInfo,
    } = useQuery({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const res = await getUserInfo();
            return res.data.data;
        },
        refetchOnWindowFocus: false,
        enabled: isEnable,
    });
    return {
        userInfo,
        isUserInfoLoading,
        isUserInfoError,
        error,
        refetchUserInfo,
    };
};
