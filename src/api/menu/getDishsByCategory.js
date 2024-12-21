import { API } from "../axios.config";
import axios from "axios";

export const getDishsByCategory = async (menuId, categoryName, signal) => {
    try {
        const res = await API.get(`/v2/menu/${menuId}/dishes`, {
            params: {
                category: categoryName,
            },
            signal,
        });
        return res.data.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Get dishes request cancelled");
            return;
        }
        console.error(
            `Failed to fetch dishes by category: ${categoryName}`,
            error,
        );
        throw error;
    }
};
