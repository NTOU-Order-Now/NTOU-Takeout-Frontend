import axios from "axios";
import { API } from "../axios.config";
import Cookies from "js-cookie";

/**
 * Update order status
 * @param {string} orderId - The ID of the order to update
 * @param {string} status - New status of the order ('PENDING','PROCESSING','COMPLETED','PICKED_UP','CANCELED')
 * @param {AbortSignal} [signal] - AbortController signal for cancellation
 * @returns {Promise<Object>} Response with status, message and data
 */
export const updateOrderStatus = async (orderId, status, signal) => {
    try {
        const authToken = Cookies.get("authToken");
        const res = await API.patch(`/v1/order/${orderId}/status`, null, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            params: {
                status,
            },
            signal,
        });
        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Update order status request cancelled");
            return;
        }
        console.error("Update order status error:", error);
        throw error;
    }
};
