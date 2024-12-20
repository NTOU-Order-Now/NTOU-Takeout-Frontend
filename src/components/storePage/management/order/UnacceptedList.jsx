import OrderCard from "./OrderCard.jsx";
import useOrderStore from "../../../../stores/orderStore.js";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useOrderQueries } from "../../../../hooks/order/useOrderQueries.jsx";
const UnacceptedList = () => {
    const orders = useOrderStore((state) => state.orders);
    const { ref, inView } = useInView({
        rootMargin: "100px",
    });
    const {
        data: fetchedData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useOrderQueries("PENDING");
    // console.debug("Unaccepted list data:", fetchedData);
    // useEffect(() => {
    //     if (inView && !isFetchingNextPage && hasNextPage) {
    //         fetchNextPage();
    //     }
    // }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);
    // if (isLoading) {
    //     return <div className="text-center pt-20">Loading...</div>;
    // }
    //
    // if (isError) {
    //     return <div className="text-center pt-20">Error: {error.message}</div>;
    // }

    const filteredOrders = orders.filter((order) => order.status === "PENDING");

    return (
        <div className="flex flex-col text-center justify-between ">
            {filteredOrders.length > 0 ? (
                <>
                    {filteredOrders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                    <div ref={ref}>
                        {hasNextPage && isFetchingNextPage && (
                            <div className="text-center py-4">
                                Loading more...
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p className="text-gray-500 pt-20">目前沒有未接單的訂單</p>
            )}
        </div>
    );
};

export default UnacceptedList;
