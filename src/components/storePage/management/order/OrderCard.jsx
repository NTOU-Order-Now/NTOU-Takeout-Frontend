import PropTypes from "prop-types";
import useOrderStore from "../../../../stores/orderStore.js";
import { useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
const ConfirmAcceptDialog = lazy(
    () => import("@/components/storePage/management/order/ConfirmDialog.jsx"),
);
const OrderCard = ({ order, showStatus = true, pageId }) => {
    const setOrderData = useOrderStore((state) => state.setOrderData);

    const isOverdue = (orderTime, estimatedPrepTime) => {
        const today = new Date();
        const [hours, minutes, seconds] = orderTime.split(":");
        const [secs, millisecs] = seconds.split(".");

        const orderDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            parseInt(hours),
            parseInt(minutes),
            parseInt(secs),
            parseInt(millisecs),
        );
        const expectedFinishTime = new Date(
            orderDate.getTime() + estimatedPrepTime * 60 * 1000,
        );
        return new Date() > expectedFinishTime;
    };

    const navigate = useNavigate();
    const handleSeeDetail = (e) => {
        e.preventDefault();
        setOrderData(order);
        navigate(`/store/pos/management/order/${order.id.slice(-5)}`);
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
                {/* accepted Badge */}
                {showStatus && order.status !== "PENDING" && (
                    <div className="flex items-center mb-2">
                        {isOverdue(order.orderTime, order.estimatedPrepTime) &&
                            order.status === "PROCESSING" && (
                                <span className="text-red-500 text-sm ml-2 font-bold pr-2">
                                    超時
                                </span>
                            )}
                        <Suspense
                            fallback={
                                <Skeleton className="px-3 py-1 rounded bg-gray-300 opacity-5 w-full h-6" />
                            }
                        >
                            <ConfirmAcceptDialog
                                order={order}
                                status={order.status}
                                pageId={pageId}
                            />
                        </Suspense>
                    </div>
                )}
                {/* unaccepted Badge */}
                {order.status === "PENDING" && (
                    <div className="flex gap-2">
                        {
                            <Suspense
                                fallback={
                                    <Skeleton className="px-3 py-1 rounded bg-red-500 opacity-5 w-full h-6" />
                                }
                            >
                                <ConfirmAcceptDialog
                                    order={order}
                                    status={"REJECT"}
                                    pageId={pageId}
                                />
                            </Suspense>
                        }
                        {
                            <Suspense
                                fallback={
                                    <Skeleton className="px-3 py-1 rounded bg-green-500 opacity-5 w-12 h-6" />
                                }
                            >
                                <ConfirmAcceptDialog
                                    order={order}
                                    status={"ACCEPT"}
                                    pageId={pageId}
                                />
                            </Suspense>
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
        cost: PropTypes.number.isRequired,
        orderTime: PropTypes.string.isRequired,
        estimatedPrepTime: PropTypes.number.isRequired,
    }).isRequired,
    onAccept: PropTypes.func,
    onReject: PropTypes.func,
    onStatusChange: PropTypes.func,
    showStatus: PropTypes.bool,
    pageId: PropTypes.number.isRequired,
};

export default OrderCard;
