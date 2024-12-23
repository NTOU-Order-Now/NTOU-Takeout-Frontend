import axios from "axios";
import { API } from "../axios.config";
import Cookies from "js-cookie";

export const patchCart = async (orderedDishId, payload, signal) => {
    try {
        const authToken = Cookies.get("authToken");
        const res = await API.patch(
            `/v1/cart/dishes/${orderedDishId}`,
            payload,
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
            console.debug("PATCH cart request cancelled");
            return;
        } else {
            console.error("PATCH cart error; ", error);
            throw error;
        }
    }
};
