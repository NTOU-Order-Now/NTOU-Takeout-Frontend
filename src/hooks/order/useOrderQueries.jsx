import { useQueries } from "@tanstack/react-query";
import { searchOrder } from "@/api/order/searchOrder.js";
import { useState, useMemo } from "react";
import useOrderStore from "@/stores/pos/orderStore.js";

export const useOrderQueries = (status) => {
    const PAGE_SIZE = 5;
    const {
        acceptedListNumber,
        setAcceptedListNumber,
        unacceptedListNumber,
        setUnacceptedListNumber,
    } = useOrderStore();
    let totalPages =
        status === "ALL" ? acceptedListNumber : unacceptedListNumber;
    console.debug("totalPages===========", totalPages);
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
                    if (status === "ALL") {
                        setAcceptedListNumber(response.data.totalPages);
                    } else {
                        setUnacceptedListNumber(response.data.totalPages);
                    }
                }

                return response.data;
            },
        })),
        combine: (results) => {
            const successfulResults = results.filter(
                (result) => result.isSuccess && result.data,
            );
            //calculate progress
            const totalQueries = totalPages;
            const completedQueries = results.filter(
                (result) => result.isSuccess || result.isError,
            ).length;
            const progressPercentage = Math.round(
                (completedQueries / totalQueries) * 180,
            );
            return {
                orders: {
                    pages: successfulResults.map((result) => result.data),
                },
                isQueriesSuccess: results.every((result) => result.isSuccess),
                isLoading: results.some((result) => result.isLoading),
                isError: results.some((result) => result.isError),
                error: results.find((result) => result.error)?.error,
                progress: progressPercentage,
                completedQueries,
            };
        },
    });

    return {
        ...results,
    };
};
