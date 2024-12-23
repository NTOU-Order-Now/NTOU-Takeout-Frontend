import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { putDishOrder } from "../../api/pos/menu/putDishOrder.js";
export const useUpdateDishOrderMutation = (menuId) => {
    const queryClient = useQueryClient();
    const abortControllerRef = useRef(null);

    const {
        mutateAsync: updateDishOrder,
        isError,
        isPending,
    } = useMutation({
        mutationFn: async ({ categoryName, newOrder }) => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const orderIds = newOrder.map((d) => d.id);
            const controller = new AbortController();
            abortControllerRef.current = controller;
            const res = await putDishOrder(
                menuId,
                categoryName,
                orderIds,
                controller.signal,
            );

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            return res;
        },
        onMutate: async ({ categoryName, newOrder }) => {
            await queryClient.cancelQueries(["categoryDishes", categoryName]);
            const previousDishes = queryClient.getQueryData([
                "categoryDishes",
                categoryName,
            ]);

            const newDishes = { ...previousDishes, dishes: newOrder };

            queryClient.setQueryData(
                ["categoryDishes", categoryName],
                newDishes,
            );

            return { previousDishes, categoryName };
        },
        onError: (err, newOrder, context) => {
            if (context?.previousDishes) {
                queryClient.setQueryData(
                    ["categoryDishes", context.categoryName],
                    context.previousDishes,
                );
            }
            alert("變更錯誤，請重整後再試");
        },
        onSettled: (_, __, variables) => {
            queryClient.invalidateQueries([
                "categoryDishes",
                variables.categoryName,
            ]);
        },
    });
    return {
        updateDishOrder,
        isError,
        isPending,
    };
};
