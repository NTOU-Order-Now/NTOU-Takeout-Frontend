import PropTypes from "prop-types";
import { lazy, Suspense } from "react";
import CustomerStoreOrderCard from "../../../history/CustomerStoreOrderCard.jsx";
import { Progress } from "@/components/ui/progress";
import { useSystemContext } from "@/context/useSystemContext.jsx";
import { useOrderQueries } from "@/hooks/order/useOrderQueries.jsx";
import useOrderStore from "@/stores/pos/orderStore.js";
import OrderCardSkeleton from "@/skeleton/pos/order/OrderCardSkeleton.jsx";
const StoreOrderCard = lazy(() => import("./OrderCard.jsx"));
function AcceptedList() {
    const { orders, isLoading, isError, error, progress, completedQueries } =
        useOrderQueries("ALL");

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
    const flatOrders = filterOrders?.flatMap((orders) => orders);
    const { acceptedListNumber } = useOrderStore();
    if (isLoading || progress < 180) {
        return (
            <div className="w-full flex justify-center mt-20">
                感
                <div className="w-3/5 flex flex-col justify-center items-center">
                    <Progress value={progress} className="w-full" />
                    <div className="text-sm text-gray-500">
                        Loading {completedQueries} of {acceptedListNumber} ...
                    </div>
                </div>
            </div>
        );
    }
    if (flatOrders?.length === 0) {
        return (
            <div className="w-full flex justify-center mt-20">
                <div className="w-3/5 flex flex-col justify-center items-center">
                    <div className="text-lg text-gray-500">目前無已接訂單</div>
                </div>
            </div>
        );
    }
    if (isError) {
        return <div className="text-center pt-20">Error: {error}</div>;
    }
    return (
        <div className="flex flex-col text-center justify-between ">
            {filterOrders.map((page, idx) =>
                page.map((order, _) => {
                    return role === "MERCHANT" ? (
                        <Suspense fallback={<OrderCardSkeleton />} key={_}>
                            <StoreOrderCard
                                key={_}
                                order={order}
                                pageId={idx}
                            />
                        </Suspense>
                    ) : (
                        <CustomerStoreOrderCard key={_} order={order} />
                    );
                }),
            )}
        </div>
    );
}

AcceptedList.prototype = {
    orderData: PropTypes.object,
};

export default AcceptedList;
