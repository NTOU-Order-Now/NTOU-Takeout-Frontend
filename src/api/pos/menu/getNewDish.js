import { API } from "../../axios.config";
import axios from "axios";
import Cookies from "js-cookie";

export const getNewDish = async (menuId, signal) => {
    const authToken = Cookies.get("authToken");
    try {
        const res = await API.get(`/v2/menu/${menuId}/dish/create`, {
            signal,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Get new dish ID request cancelled");
            return;
        }

        console.error(
            `Failed to get new dish ID for menu (ID: ${menuId}):`,
            error,
        );
        throw error;
    }
};
