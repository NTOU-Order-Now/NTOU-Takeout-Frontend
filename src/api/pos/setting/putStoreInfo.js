import { API } from "../../axios.config";
import axios from "axios";
import Cookies from "js-cookie";

export const putStoreInfo = async (
    { storeId, name, picture, address, description, businessHours },
    signal,
) => {
    const authToken = Cookies.get("authToken");
    try {
        const res = await API.put(
            `/v2/stores/${storeId}`,
            {
                name,
                picture,
                address,
                description,
                businessHours,
            },
            {
                signal,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            },
        );
        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Update store information request cancelled");
            return;
        }
        console.error(
            `Failed to update store information (ID: ${storeId}):`,
            error,
        );
        throw error;
    }
};
