import { API } from "../../axios.config";
import axios from "axios";
import Cookies from "js-cookie";

export const deleteDish = async (menuId, dishId, signal) => {
    const authToken = Cookies.get("authToken");
    try {
        const res = await API.delete(`/v2/menu/${menuId}/dish/${dishId}`, {
            signal,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Delete dish request cancelled");
            return;
        }

        console.error(
            `Failed to delete dish (ID: ${dishId}) from menu (ID: ${menuId}):`,
            error,
        );
        throw error;
    }
};
