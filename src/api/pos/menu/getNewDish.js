import { API } from "../../axios.config";
import axios from "axios";

export const getNewDish = async (menuId, signal) => {
    try {
        const res = await API.get(`/v2/menu/${menuId}/dish/create`, {
            signal,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });

        return res.data.data;
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
