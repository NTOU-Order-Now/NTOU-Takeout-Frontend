import { useInfiniteQuery } from "@tanstack/react-query";
import { searchOrder } from "../../api/order/searchOrder.js";
import useOrderStore from "../../stores/orderStore.js";

export const useOrderQueries = (status) => {
    const { addOrders, clearOrders } = useOrderStore();
    const PAGE_SIZE = 3;

    return useInfiniteQuery({
        queryKey: ["orders", status],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await searchOrder({
                page: pageParam,
                size: PAGE_SIZE,
                status: status,
            });

            // Add new orders to store
            addOrders(response.data);
            return response;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.length < PAGE_SIZE) {
                return undefined; // No more pages
            }
            return allPages.length; // Next page number
        },
        initialPageParam: 0,
        onError: (error) => {
            console.error("Order fetch error:", error);
        },
    });
};
