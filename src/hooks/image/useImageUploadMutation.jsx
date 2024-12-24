import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postImage } from "../../api/image/postImage.js";
import { useRef } from "react";

export const useImageUploadMutation = () => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);
    const {
        mutateAsync: uploadImage,
        isError,
        error,
        isPending,
    } = useMutation({
        mutationFn: async (file) => {
            // Cancel previous request if exists
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            const formData = new FormData();
            formData.append(`image`, file);

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }
            return await postImage(controller.signal, formData);
        },
        onError: (err) => {
            console.log(err);
            alert("圖片上傳失敗");
        },
    });
    return {
        uploadImage,
        isError,
        isPending,
        error,
    };
};
