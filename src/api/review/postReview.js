import { API } from "../axios.config";
import Cookies from "js-cookie";
import axios from "axios";
export const postReview = async (signal, payload, storeId) => {
    try {
        const authToken = Cookies.get("authToken");
        const res = await API.post(`/v1/reviews/${storeId}`, payload, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            signal,
        });
        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("POST review request cancelled");
            return;
        } else {
            console.error("POST review error:", error);
        }
        throw error;
    }
};
