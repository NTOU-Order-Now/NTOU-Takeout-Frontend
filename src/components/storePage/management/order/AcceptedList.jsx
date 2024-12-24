import PropTypes from "prop-types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useOrderInfiniteQuery } from "../../../../hooks/order/useOrderInfiniteQuery.jsx";
import StoreOrderCard from "./OrderCard.jsx";
import CustomerStoreOrderCard from "../../../history/OrderCard.jsx";
import { useSystemContext } from "../../../../context/useSystemContext.jsx";
function AcceptedList() {
    const { ref, inView } = useInView({
        rootMargin: "100px",
    });

    const {
        orders,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useOrderInfiniteQuery("ALL");

    const { userInfo } = useSystemContext();
    const role = userInfo?.role;
    const filterOrders = orders?.pages.map((page) =>
        page.content.filter((order) =>
            role === "MERCHANT"
                ? order.status !== "PENDING"
                : order.status !== "PENDING" &&
                  order.status !== "PROCESSING" &&
                  order.status !== "COMPLETED",
        ),
    );
    useEffect(() => {
        if (inView && !isFetchingNextPage && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);
    if (isLoading || filterOrders === undefined || orders === undefined) {
        return <div className="text-center pt-20">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center pt-20">Error: {error}</div>;
    }
    // console.debug("filterOrders", filterOrders);
    // if (filterOrders.map) {
    //     return <div className="text-center pt-20">目前沒有已接訂單</div>;
    // }
    return (
        <div className="flex flex-col text-center justify-between ">
            {filterOrders.map((page) =>
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
}

AcceptedList.prototype = {
    orderData: PropTypes.object,
};

export default AcceptedList;
