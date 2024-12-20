import { API } from "../axios.config";
import Cookies from "js-cookie";
import axios from "axios";

/**
 * Search orders with pagination and status filter
 * @param {Object} params - Search parameters
 * @param {number} [params.page=0] - Page number
 * @param {number} [params.size=10] - Page size
 * @param {string} [params.status] - Order status ('IN_CART', 'PENDING','PROCESSING','COMPLETED','PICKED_UP','CANCELED')
 * @param {AbortSignal} [signal] - AbortController signal for cancellation
 * @returns {Promise<Object>} Response data with status, message and order list
 */
export const searchOrder = async (params = {}, signal) => {
    try {
        const { page = 0, size = 3, status } = params;

        const queryParams = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
        });

        // Only add status to query params if it exists
        if (status) {
            queryParams.append("status", status);
        }

        const authToken = Cookies.get("authToken");
        const res = await API.get(
            `/v1/order/search?${queryParams.toString()}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                signal,
            },
        );

        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Search order request cancelled");
            return;
        }
        console.error("Search order error:", error);
        throw error;
    }
};
