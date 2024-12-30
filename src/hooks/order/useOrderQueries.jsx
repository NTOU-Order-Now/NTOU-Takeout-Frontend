import { useQueries } from "@tanstack/react-query";
import { searchOrder } from "@/api/order/searchOrder.js";
import { useState, useMemo } from "react";

export const useOrderQueries = (status) => {
    const PAGE_SIZE = 5;
    const [totalPages, setTotalPages] = useState(1);

    const pages = useMemo(() => {
        return Array.from({ length: totalPages }, (_, index) => index);
    }, [totalPages]);

    const results = useQueries({
        queries: pages.map((page) => ({
            queryKey: ["orders", status, page],
            queryFn: async ({ signal }) => {
                const response = await searchOrder(
                    {
                        page,
                        size: PAGE_SIZE,
                        status: status === "ALL" ? null : status,
                    },
                    signal,
                );
                if (response.data.totalPages !== totalPages) {
                    setTotalPages(response.data.totalPages);
                }

                return response.data;
            },
            staleTime: 1000 * 60, // 1 minute
        })),
        combine: (results) => {
            const successfulResults = results.filter(
                (result) => result.isSuccess && result.data,
            );

            return {
                orders: {
                    pages: successfulResults.map((result) => result.data),
                },
                isQueriesSuccess: results.every((result) => result.isSuccess),
                isLoading: results.some((result) => result.isLoading),
                isError: results.some((result) => result.isError),
                error: results.find((result) => result.error)?.error,
            };
        },
    });

    return {
        ...results,
    };
};
