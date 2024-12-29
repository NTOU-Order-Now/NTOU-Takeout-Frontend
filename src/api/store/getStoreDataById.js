import { API } from "../axios.config";
import axios from "axios";
export const getStoreDataById = async (idList, signal) => {
    try {
        const res = await API.post(`/v1/stores/query`, idList, {
            signal,
        });

        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Get store data request cancelled");
            return;
        } else {
            console.error("Get store data error:", error);
        }
        throw error;
    }
};
