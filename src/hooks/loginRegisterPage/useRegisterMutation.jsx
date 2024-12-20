import { useMutation } from "@tanstack/react-query";
import registerClient from "../../api/auth/registerClient";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

export const useRegisterMutation = (isEnabled = true) => {
    const navigate = useNavigate();
    const {
        mutateAsync: registerMutation,
        isSuccess: isRegisterSuccess,
        isPending,
    } = useMutation({
        mutationFn: async (userDetails) => {
            const hashedPassword = CryptoJS.SHA256(
                userDetails.password,
            ).toString();
            const payload = {
                name: userDetails.username,
                email: userDetails.email,
                phoneNumber: userDetails.phone,
                password: hashedPassword,
                gender: "OTHER",
                role: userDetails.role,
            };

            return await registerClient.registerUser(payload);
        },
        onSuccess: () => {
            navigate("/auth/login",{replace:true})
        },
        onError: (error) => {
            console.error("Registration failed:", error);
            throw error;
        },
        enabled: isEnabled,
    });

    return {
        registerMutation,
        isRegisterSuccess,
        isPending,
    };
};
