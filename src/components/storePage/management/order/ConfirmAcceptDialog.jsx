import { Button } from "@/components/ui/button";
import {
    Dialog,
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
const ConfirmAcceptDialog = ({ order, type, pageId }) => {
    const TriggerText = ["接單", "拒絕"];
    const Title = ["確認接收訂單?", "確認拒絕訂單?"];
    const Description = [
        "訂單接收後不可取消，顧客也不可取消訂單",
        "訂單拒絕後會立即通知顧客",
    ];
    const BadgeColor = ["bg-green-500", "bg-red-500"];
    const BadgeHoverColor = ["bg-green-600", "bg-red-600"];
    let typeIdx;
    switch (type) {
        case "confirmAccept":
            typeIdx = 0;
            break;
        case "cancelAccept":
            typeIdx = 1;
            break;
    }
    const { updateOrderStatusAsync } = useOrderStatusMutation(pageId);
    const handleAccept = useCallback(
        async (orderId) => {
            try {
                await updateOrderStatusAsync({
                    orderId,
                    newStatus: "PROCESSING",
                });
            } catch (error) {
                console.error("Failed to accept order:", error);
            }
        },
        [updateOrderStatusAsync],
    );
    const handleReject = useCallback(
        async (orderId) => {
            try {
                await updateOrderStatusAsync({
                    orderId,
                    newStatus: "CANCELED",
                });
                console.debug("Reject order: ", orderId);
            } catch (error) {
                console.error("Failed to reject order:", error);
            }
        },
        [updateOrderStatusAsync],
    );
    const setOrderData = useOrderStore((state) => state.setOrderData);
    const navigate = useNavigate();
    // const handleSeeDetail = async () => {
    //     setOrderData(order);
    //     await navigate(`/store/pos/management/order/${order.id.slice(-5)}`);
    // };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className={`${BadgeColor[typeIdx]} text-white px-3 py-1 text-sm font-bold rounded hover:${BadgeHoverColor[typeIdx]}`}
                >
                    {TriggerText[typeIdx]}
                </button>
            </DialogTrigger>
            <DialogContent className="w-3/4">
                <DialogHeader>
                    <DialogTitle>{Title[typeIdx]}</DialogTitle>
                    <DialogDescription>
                        {Description[typeIdx]}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={() => {
                            if (typeIdx === 0) {
                                handleAccept(order.id);
                            } else if (typeIdx === 1) {
                                handleReject(order.id);
                            }
                        }}
                    >
                        確定
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
ConfirmAcceptDialog.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        orderTime: PropTypes.string.isRequired,
        estimatedPrepTime: PropTypes.number.isRequired,
    }).isRequired,
    type: PropTypes.string.isRequired,
    pageId: PropTypes.number.isRequired,
};
export default ConfirmAcceptDialog;
