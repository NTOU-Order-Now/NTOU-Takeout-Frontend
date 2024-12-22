import OrderCard from "./OrderCard.jsx";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useOrderInfiniteQuery } from "../../../../hooks/order/useOrderInfiniteQuery.jsx";
import { useQueryClient } from "@tanstack/react-query";
const UnacceptedList = () => {
    const { ref, inView } = useInView({
        rootMargin: "100px",
    });
    // const queryClient = useQueryClient();
    // queryClient.invalidateQueries(["order"]);
    const {
        orders,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useOrderInfiniteQuery("PENDING");
    console.debug("orders", orders, hasNextPage);
    useEffect(() => {
        if (inView && !isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);
    if (isLoading || orders === undefined) {
        return <div className="text-center pt-20">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center pt-20">Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col text-center justify-between ">
            {orders?.pages.map((page) =>
                page.content.map((order, _) => {
                    return <OrderCard key={_} order={order} />;
                }),
            )}
            <div ref={ref}>
                {hasNextPage && isFetchingNextPage && (
                    <div className="text-center py-4">Loading more...</div>
                )}
            </div>
        </div>
    );
};

export default UnacceptedList;
