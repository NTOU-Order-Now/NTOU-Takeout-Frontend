import { API } from "../../axios.config";
import axios from "axios";
import Cookies from "js-cookie";

export const putDish = async (
    {
        menuId,
        dishId,
        name,
        description,
        picture,
        price,
        category,
        dishAttributes,
    },
    signal,
) => {
    try {
        const authToken = Cookies.get("authToken");
        const res = await API.put(
            `/v2/menu/${menuId}/dish/${dishId}`,
            {
                name,
                description,
                picture,
                price,
                category,
                dishAttributes,
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
            console.debug("Update dish request cancelled");
            return;
        }
        console.error(
            `Failed to update dish (ID: ${dishId}) in menu (ID: ${menuId}):`,
            error,
        );
        throw error;
    }
};
