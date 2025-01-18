import { API } from "../axios.config";
import Cookies from "js-cookie";
import axios from "axios";
export const postCart = async (signal, payload) => {
    try {
        const authToken = Cookies.get("authToken");
        const res = await API.post(`/v1/cart/dishes`, payload, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            signal,
        });
        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("POST cart request cancelled");
            return;
        } else {
            console.error("POST cart error:", error);
        }
        throw error;
    }
};
