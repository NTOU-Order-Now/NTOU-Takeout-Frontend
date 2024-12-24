import axios from "axios";
import { API } from "../axios.config";
import Cookies from "js-cookie";

export const sendCart = async (remark, signal) => {
    const authToken = Cookies.get("authToken");
    try {
        const res = await API.patch(
            "/v1/cart/send",
            { note: remark },
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
        } else {
            console.error("PATCH cart error; ", error);
            throw error;
        }
    }
};
