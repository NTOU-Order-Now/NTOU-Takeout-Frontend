import { useMutation } from "@tanstack/react-query";
import loginClient from "../../api/auth/loginClient";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../stores/user/userInfoStore.js";

export const useLoginMutation = (isEnabled = true) => {
    const setUser = userInfoStore((state) => state.setUser);
    const navigate = useNavigate();
    const {
        mutateAsync: loginMutation,
        isSuccess: isLoginSuccess,
        isPending,
    } = useMutation({
        mutationFn: async (userDetails) => {
            userDetails.password = CryptoJS.SHA256(
                userDetails.password,
            ).toString();
            return await loginClient.loginUser(userDetails);
        },
        onSuccess: (data) => {
            setUser(data);
            navigate("/");
        },
        onError: (error) => {
            console.error("Login failed:", error);
            throw error;
        },
        enabled: isEnabled,
    });

    return {
        loginMutation,
        isLoginSuccess,
        isPending,
    };
};
