import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { putStoreInfo } from "../../api/pos/setting/putStoreInfo.js";

export const useStoreInfoMutation = (storeId) => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);

    const {
        mutateAsync: updateStore,
        isError,
        isPending,
    } = useMutation({
        mutationFn: async ({
            name,
            picture,
            address,
            description,
            businessHours,
        }) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            const controller = new AbortController();
            abortControllerRef.current = controller;

            const result = await putStoreInfo(
                {
                    storeId,
                    name,
                    picture,
                    address,
                    description,
                    businessHours,
                },
                controller.signal,
            );

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            return result;
        },
        onMutate: async (newStoreData) => {
            // 取消相關的查詢
            await queryClient.cancelQueries(["storeInformation", storeId]);

            // 保存舊的資料狀態
            const previousStoreData = queryClient.getQueryData([
                "storeInformation",
                storeId,
            ]);

            // 樂觀更新
            queryClient.setQueryData(["storeInformation", storeId], {
                ...previousStoreData,
                ...newStoreData,
            });

            return { previousStoreData };
        },
        onError: (error, variables, context) => {
            console.debug("variables", variables, context);
            //rollback
            if (context?.previousStoreData) {
                queryClient.setQueryData(
                    ["storeInformation", storeId],
                    context.previousStoreData,
                );
            }

            alert("更新錯誤，請重整頁面後再試");
            console.error("Update store information error:", error);
        },
        onSettled: () => {
            // 重新驗證查詢
            queryClient.invalidateQueries(["storeInformation", storeId]);
        },
    });

    return {
        updateStore,
        isError,
        isPending,
    };
};
