import { API } from "../axios.config";
import axios from "axios";
export const getMenuById = async (signal, menuId) => {
    try {
        const res = await API.get(`/v2/menu/${menuId}`, {
            signal,
        });
        return res.data.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Get cart request cancelled");
            return;
        } else {
            console.error("Get cart error:", error);
        }
        throw error;
    }
};
