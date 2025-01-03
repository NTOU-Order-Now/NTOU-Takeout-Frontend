import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useOrderStore from "@/stores/orderStore.js";
import { useCallback } from "react";
import { useOrderStatusMutation } from "@/hooks/order/useOrderStatusMutation.jsx";
const ConfirmDialog = ({ order, status, pageId }) => {
    const getStatusData = (status) => {
        switch (status) {
            case "ACCEPT":
                return {
                    bgColor: "bg-green-500",
                    bgHoverColor: "bg-green-600",
                    statusText: "接單",
                    title: "將訂單轉為製作中?",
                    description:
                        "訂單接收後不可取消，顧客也不可取消訂單。\n確認後訂單將切換為製作中",
                    disable: false,
                };
            case "REJECT":
                return {
                    bgColor: "bg-red-500",
                    bgHoverColor: "bg-red-600",
                    statusText: "拒絕",
                    title: "拒絕此訂單?",
                    description: "訂單拒絕後會立即通知顧客",
                    disable: false,
                };
            case "PROCESSING":
                return {
                    bgColor: "bg-blue-500",
                    bgHoverColor: "bg-blue-600",
                    statusText: "製作中",
                    title: "將訂單轉為未取餐?",
                    description:
                        "確認訂單已製作完畢，確認後將通知顧客可前往取餐，訂單狀態切換為未取餐",
                    disable: false,
                };
            case "COMPLETED":
                return {
                    bgColor: "bg-yellow-500",
                    bgHoverColor: "bg-yellow-600",
                    statusText: "未取餐",
                    title: "將訂單轉為已取餐?",
                    description:
                        "確認顧可已經取餐，確認後將訂單狀態切換為已取餐",
                    disable: false,
                };
            case "PICKED_UP":
                return {
                    bgColor: "bg-lime-600",
                    bgHoverColor: "bg-lime-600",
                    statusText: "已取餐",
                    title: "此訂單已取餐",
                    disable: true,
                };
            case "CANCELED":
                return {
                    bgColor: "bg-gray-500",
                    textColor: "text-gray-500",
                    statusText: "取消",
                    title: "此訂單已取消",
                    disable: true,
                };
            default:
                return {
                    bgColor: "bg-gray-200",
                    statusText: "",
                };
        }
    };

    const getNextStatus = (status) => {
        switch (status) {
            case "ACCEPT":
                return "PROCESSING";
            case "REJECT":
                return "CANCELED";
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

    const { bgColor, bgHoverColor, statusText, title, description, disable } =
        getStatusData(status);
    const nextStatus = getNextStatus(status);
    const { updateOrderStatusAsync } = useOrderStatusMutation(pageId);
    const handleStatusUpdate = useCallback(async () => {
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
    }, [order.id, updateOrderStatusAsync, nextStatus]);

    // const setOrderData = useOrderStore((state) => state.setOrderData);
    // const navigate = useNavigate();
    // const handleSeeDetail = async () => {
    //     setOrderData(order);
    //     await navigate(`/store/pos/management/order/${order.id.slice(-5)}`);
    // };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className={`${bgColor} text-white px-3 py-1 text-sm w-full font-bold rounded-md hover:${bgHoverColor} disabled:${disable}`}
                >
                    {statusText}
                </button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            onClick={async () => {
                                if (disable) return;
                                await handleStatusUpdate();
                            }}
                        >
                            確定
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
ConfirmDialog.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        orderTime: PropTypes.string.isRequired,
        estimatedPrepTime: PropTypes.number.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
    pageId: PropTypes.number.isRequired,
};
export default ConfirmDialog;
