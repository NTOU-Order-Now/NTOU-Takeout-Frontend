import { API } from "../../axios.config";
import axios from "axios";
import Cookies from "js-cookie";

export const putDishOrder = async (menuId, categoryName, dishIds, signal) => {
    const authToken = Cookies.get("authToken");
    try {
        const res = await API.put(`/v2/menu/${menuId}/dishes`, dishIds, {
            params: {
                category: categoryName,
            },
            signal,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Update dishes order request cancelled");
            return;
        }

        console.error(
            `Failed to update dishes order in category ${categoryName}:`,
            error,
        );
        throw error;
    }
};
