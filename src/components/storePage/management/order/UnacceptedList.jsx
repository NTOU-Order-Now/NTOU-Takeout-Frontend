import StoreOrderCard from "./OrderCard.jsx";
import CustomerStoreOrderCard from "../../../../components/history/OrderCard.jsx";

import { useSystemContext } from "@/context/useSystemContext.jsx";
import { useOrderQueries } from "@/hooks/order/useOrderQueries.jsx";

const UnacceptedList = () => {
    const { userInfo } = useSystemContext();
    const role = userInfo?.role;

    const { orders, isLoading, isError, error } = useOrderQueries(
        role === "MERCHANT" ? "PENDING" : "ALL",
    );

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
        </div>
    );
};

export default UnacceptedList;
