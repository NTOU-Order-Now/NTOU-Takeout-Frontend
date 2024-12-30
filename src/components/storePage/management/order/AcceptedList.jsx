import PropTypes from "prop-types";

import StoreOrderCard from "./OrderCard.jsx";
import CustomerStoreOrderCard from "../../../history/OrderCard.jsx";
import { useSystemContext } from "@/context/useSystemContext.jsx";
import { useOrderQueries } from "@/hooks/order/useOrderQueries.jsx";
function AcceptedList() {
    const { orders, isLoading, isError, error } = useOrderQueries("ALL");

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

    if (isLoading || orders === undefined || orders.pages.length === 0) {
        return <div className="text-center pt-20">Loading...</div>;
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
