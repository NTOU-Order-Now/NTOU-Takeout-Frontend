import { API } from "../../axios.config";
import axios from "axios";

export const getStoreInfo = async (storeId, signal) => {
    console.debug("getStoreInfo", storeId, signal);
    try {
        const res = await API.get(`/v2/stores/${storeId}`, {
            signal,
        });
        console.debug("rrrrrrrrrrrrrrrr", res.data);
        return res.data.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Get store information request cancelled");
            return;
        }

        console.error(
            `Failed to get store information (ID: ${storeId}):`,
            error,
        );
        throw error;
    }
};
