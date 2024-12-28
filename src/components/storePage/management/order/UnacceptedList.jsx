import StoreOrderCard from "./OrderCard.jsx";
import CustomerStoreOrderCard from "../../../../components/history/OrderCard.jsx";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useOrderInfiniteQuery } from "../../../../hooks/order/useOrderInfiniteQuery.jsx";
import { useSystemContext } from "../../../../context/useSystemContext.jsx";

const UnacceptedList = () => {
    const { ref, inView } = useInView({
        rootMargin: "100px",
    });
    const { userInfo } = useSystemContext();
    const role = userInfo?.role;

    const {
        orders,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useOrderInfiniteQuery(role === "MERCHANT" ? "PENDING" : "ALL");
    useEffect(() => {
        if (inView && !isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

    const filterOrders = orders?.pages.map((page) =>
        page.content.filter((order) =>
            role === "MERCHANT"
                ? order.status === "PENDING"
                : order.status !== "PICKED_UP" && order.status !== "CANCELED",
        ),
    );
    if (isLoading || orders === undefined || filterOrders === undefined) {
        return <div className="text-center pt-20">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center pt-20">Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col text-center justify-between ">
            {filterOrders?.map((page) =>
                page.map((order, _) => {
                    return role === "MERCHANT" ? (
                        <StoreOrderCard key={_} order={order} />
                    ) : (
                        <CustomerStoreOrderCard key={_} order={order} />
                    );
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
