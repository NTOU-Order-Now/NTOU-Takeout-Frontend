import { API } from "../../axios.config";
import axios from "axios";
import Cookies from "js-cookie";

export const patchCategoryName = async (
    menuId,
    oldCategoryName,
    newCategoryName,
    signal,
) => {
    const authToken = Cookies.get("authToken");
    try {
        const res = await API.patch(
            `/v2/menu/${menuId}/dishes`,
            {
                categoryName: newCategoryName,
            },
            {
                params: {
                    category: oldCategoryName,
                },
                signal,
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            },
        );

        return res.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.debug("Update category name request cancelled");
            return;
        }
        console.error(
            `Failed to update category name from ${oldCategoryName} to ${newCategoryName}:`,
            error,
        );
        throw error;
    }
};
