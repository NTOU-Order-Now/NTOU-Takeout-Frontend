import PropTypes from "prop-types";
import useOrderStore from "../../../../stores/orderStore.js";
import { useCallback } from "react";

const getStatusColors = (status) => {
    switch (status) {
        case "PROCESSING":
            return {
                bgColor: "bg-blue-500",
                textColor: "text-gray-100",
                statusText: "製作中",
            };
        case "COMPLETED":
            return {
                bgColor: "bg-yellow-500",
                textColor: "text-gray-100",
                statusText: "未取餐",
            };
        case "PICKED_UP":
            return {
                bgColor: "bg-lime-600",
                textColor: "text-gray-100",
                statusText: "已取餐",
            };
        case "CANCELED":
            return {
                bgColor: "bg-gray-500",
                textColor: "text-gray-100",
                statusText: "取消",
            };
        default:
            return {
                bgColor: "bg-gray-200",
                textColor: "text-gray-100",
                statusText: "",
            };
    }
};

const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
        case "PROCESSING":
            return "COMPLETED";
        case "COMPLETED":
            return "PICKED_UP";
        case "PENDING":
            return "PROCESSING";
        default:
            return null;
    }
};

const OrderCard = ({
    order,
    onAccept,
    onReject,
    onStatusChange,
    showStatus = true,
}) => {
    const { bgColor, textColor, statusText } = getStatusColors(order.status);
    const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
    const acceptOrder = useOrderStore((state) => state.acceptOrder);
    const denyOrder = useOrderStore((state) => state.denyOrder);
    const handleAccept = useCallback(
        (orderId) => {
            acceptOrder(orderId);
            console.debug("Accept order: ", orderId);
        },
        [acceptOrder],
    );
    const handleReject = useCallback(
        (orderId) => {
            denyOrder(orderId);
            console.debug("Rejecting order: ", orderId);
        },
        [denyOrder],
    );
    const isOverdue = () => {
        const now = new Date();
        const estimate = new Date(order.estimatedTime);
        return order.status === "PROCESSING" && now > estimate;
    };

    const handleStatusClick = () => {
        const nextStatus = getNextStatus(order.status);
        if (nextStatus) {
            updateOrderStatus(order.id, nextStatus);
        }
    };
    console.debug("order status", order.status);
    return (
        <div className="relative flex justify-between rounded-lg p-4 shadow-lg mb-6 bg-gray-50">
            {/* Order Info */}
            <div className="flex flex-col items-start text-start">
                <p className="text-xl font-bold ">
                    單號： {order.id.slice(-5)}
                </p>
                <p className="text-sm">下單時間: {order.orderTime}</p>
                <p className="text-sm ">預估取餐時間: {order.estimatedTime}</p>
                <button className="bg-orange-500 mt-6 text-white px-3 py-1 text-sm font-bold rounded hover:bg-orange-600">
                    訂單內容
                </button>
            </div>

            {/* Status */}
            <div className="flex flex-col items-end">
                {/* Badge */}
                {showStatus && order.status !== "PENDING" && (
                    <div className="flex items-center mb-2">
                        {isOverdue() && (
                            <span className="text-red-500 text-sm ml-2 font-bold pr-2">
                                超時
                            </span>
                        )}
                        <button
                            onClick={handleStatusClick}
                            disabled={!getNextStatus(order.status)}
                            className={`px-3 py-1 rounded-md text-sm font-bold ${bgColor} ${textColor} ${!getNextStatus(order.status) ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {statusText}
                        </button>
                    </div>
                )}
                {/* Buttons */}
                {order.status === "PENDING" && (
                    <div className="flex gap-2">
                        {
                            <button
                                onClick={() => handleAccept(order.id)}
                                className="bg-red-500 text-white px-3 py-1 text-sm font-bold rounded hover:bg-red-600"
                            >
                                拒絕
                            </button>
                        }
                        {
                            <button
                                onClick={() => handleReject(order.id)}
                                className="bg-green-500 text-white px-3 py-1 text-sm font-bold rounded hover:bg-green-600"
                            >
                                接單
                            </button>
                        }
                    </div>
                )}
            </div>

            {/* Total price */}
            <div className="absolute bottom-4 right-4 mt-5">
                <p className="mt-2 font-semibold">總金額: {order.cost} 元</p>
            </div>
        </div>
    );
};

OrderCard.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        cost: PropTypes.string.isRequired,
        orderTime: PropTypes.string.isRequired,
        estimatedTime: PropTypes.string.isRequired,
    }).isRequired,
    onAccept: PropTypes.func,
    onReject: PropTypes.func,
    onStatusChange: PropTypes.func,
    showStatus: PropTypes.bool,
};

export default OrderCard;
