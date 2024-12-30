import PropTypes from "prop-types";

import StoreOrderCard from "./OrderCard.jsx";
import CustomerStoreOrderCard from "../../../history/OrderCard.jsx";
import { Progress } from "@/components/ui/progress";
import { useSystemContext } from "@/context/useSystemContext.jsx";
import { useOrderQueries } from "@/hooks/order/useOrderQueries.jsx";
import useOrderStore from "@/stores/pos/orderStore.js";
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

    const { acceptedListNumber } = useOrderStore();
    if (
        isLoading ||
        orders === undefined ||
        orders.pages.length === 0 ||
        progress < 180
    ) {
        return (
            <div className="w-full flex justify-center mt-20">
                <div className="w-3/5 flex flex-col justify-center items-center">
                    <Progress value={progress} className="w-full" />
                    <div className="text-sm text-gray-500">
                        Loading {completedQueries} of {acceptedListNumber} ...
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-center pt-20">Error: {error}</div>;
    }
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
        </div>
    );
}

AcceptedList.prototype = {
    orderData: PropTypes.object,
};

export default AcceptedList;
