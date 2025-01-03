import PropTypes from "prop-types";
import useOrderStore from "../../stores/orderStore.js";
import { useCallback } from "react";
import { useOrderStatusMutation } from "../../hooks/order/useOrderStatusMutation.jsx";
import { useNavigate } from "react-router-dom";

const getStatusColors = (status) => {
    switch (status) {
        case "PENDING":
            return {
                bgColor: "bg-stone-600",
                textColor: "text-gray-100",
                statusText: "未接單",
            };
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
        case "PICKED_UP":
            return "CANCELED";
        case "PENDING":
            return "PROCESSING";
        default:
            return null;
    }
};

const CustomerStoreOrderCard = ({ order, showStatus = true }) => {
    const { bgColor, textColor, statusText } = getStatusColors(order.status);
    const { updateOrderStatusAsync, isLoading } = useOrderStatusMutation();
    const setOrderData = useOrderStore((state) => state.setOrderData);
    const handleStatusClick = useCallback(async () => {
        const nextStatus = getNextStatus(order.status);
        if (nextStatus) {
            try {
                await updateOrderStatusAsync({
                    orderId: order.id,
                    newStatus: nextStatus,
                });
            } catch (error) {
                console.error("Failed to update order status:", error);
            }
        }
    }, [order.id, order.status, updateOrderStatusAsync]);

    const navigate = useNavigate();
    const handleSeeDetail = (e) => {
        e.preventDefault();
        setOrderData(order);
        navigate(`/history/order/${order.id.slice(-5)}`);
    };
    return (
        <div className="relative flex justify-between rounded-lg p-4 shadow-lg mb-6 bg-gray-50">
            {/* Order Info */}
            <div className="flex flex-col items-start text-start">
                <p className="text-xl font-bold ">
                    單號： {order.id.slice(-5)}
                </p>
                <p className="text-sm font-semibold ">
                    預估製作時間: {order.estimatedPrepTime} 分鐘
                </p>
                <p className="text-sm font-medium">
                    下單時間: {order.orderTime}
                </p>
                <button
                    className="bg-orange-500 mt-6 text-white px-3 py-1 text-sm font-bold rounded hover:bg-orange-600"
                    onClick={handleSeeDetail}
                >
                    訂單內容
                </button>
            </div>

            {/* Status */}
            <div className="flex flex-col items-end">
                {/* Badge */}
                {showStatus && (
                    <div className="flex items-center mb-2">
                        <button
                            onClick={handleStatusClick}
                            disabled={true} //temp
                            className={`px-3 py-1 rounded-md text-sm font-bold ${bgColor} ${textColor} ${!getNextStatus(order.status) ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {statusText}
                        </button>
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

CustomerStoreOrderCard.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        orderTime: PropTypes.string.isRequired,
        estimatedPrepTime: PropTypes.number.isRequired,
    }).isRequired,
    onAccept: PropTypes.func,
    onReject: PropTypes.func,
    onStatusChange: PropTypes.func,
    showStatus: PropTypes.bool,
};

export default CustomerStoreOrderCard;
