import StoreOrderCard from "./OrderCard.jsx";
import CustomerStoreOrderCard from "../../../../components/history/OrderCard.jsx";
import { useSystemContext } from "@/context/useSystemContext.jsx";
import { useOrderQueries } from "@/hooks/order/useOrderQueries.jsx";
import { Progress } from "@/components/ui/progress.jsx";
import useOrderStore from "@/stores/pos/orderStore.js";

const UnacceptedList = () => {
    const { userInfo } = useSystemContext();
    const role = userInfo?.role;

    const { orders, isLoading, isError, error, progress, completedQueries } =
        useOrderQueries(role === "MERCHANT" ? "PENDING" : "ALL");

    const filterOrders = orders?.pages.map((page) =>
        page.content.filter((order) =>
            role === "MERCHANT"
                ? order.status === "PENDING"
                : order.status !== "PICKED_UP" && order.status !== "CANCELED",
        ),
    );
    const { unacceptedListNumber } = useOrderStore();
    if (isLoading || progress < 180) {
        return (
            <div className="w-full flex justify-center mt-20">
                <div className="w-3/5 flex flex-col justify-center items-center">
                    <Progress value={progress} className="w-full" />
                    <div className="text-sm text-gray-500">
                        Loading {completedQueries} of {unacceptedListNumber} ...
                    </div>
                </div>
            </div>
        );
    }

    if (filterOrders[0].length === 0) {
        return (
            <div className="w-full flex justify-center mt-20">
                <div className="w-3/5 flex flex-col justify-center items-center">
                    <div className="text-lg text-gray-500">目前無未接訂單</div>
                </div>
            </div>
        );
    }

    if (isError) {
        return <div className="text-center pt-20">Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col text-center justify-between ">
            {filterOrders?.map((page, idx) =>
                page.map((order, _) => {
                    return role === "MERCHANT" ? (
                        <StoreOrderCard key={_} order={order} pageId={idx} />
                    ) : (
                        <CustomerStoreOrderCard key={_} order={order} />
                    );
                }),
            )}
        </div>
    );
};

export default UnacceptedList;
