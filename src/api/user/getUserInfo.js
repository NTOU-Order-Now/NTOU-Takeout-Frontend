import { API } from "../axios.config.js";
import Cookies from "js-cookie";

export const getUserInfo = async () => {
    const authToken = Cookies.get("authToken");
    return await API.get(`/v1/user`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
};
