import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { postReview } from "../../api/review/postReview.js";

export const useReviewMutation = (storeId) => {
    const abortControllerRef = useRef(null);

    const {
        mutateAsync: addReview,
        isError,
        error,
        isPending,
        isSuccess,
    } = useMutation({
        mutationFn: async ({ payload }) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;
            const result = await postReview(
                controller.signal,
                payload,
                storeId,
            );

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            return result;
        },
        onError: (error, variables) => {
            console.debug("variables", variables);
            // alert("提交發生錯誤，請重整頁面再嘗試");
            console.error("add Review error:", error);
        },
    });

    return {
        addReview,
        error,
        isError,
        isPending,
        isSuccess,
    };
};
