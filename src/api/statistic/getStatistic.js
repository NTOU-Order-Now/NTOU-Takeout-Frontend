import { API } from "../axios.config.js";
import axios from "axios";
import Cookies from "js-cookie";

export const getStatistic = async (menuId, category, signal) => {
    try {
        const authToken = Cookies.get("authToken");
        const params = new URLSearchParams();
        if (category) {
            params.append("category", category);
        }

        const res = await API.get(
            `/v1/statistic/${menuId}/sales?${params.toString()}`,
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
            console.debug("Get Statistic request cancelled");
            return;
        } else {
            console.error("Get Statistic error:", error);
        }
        throw error;
    }
};
