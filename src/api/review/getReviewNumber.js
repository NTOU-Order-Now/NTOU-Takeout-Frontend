import { API } from "../axios.config";
export const getReviewNumber = async (storeId, signal) => {
    try {
        const res = await API.get(`/v1/reviews/${storeId}`, { signal });
        return res.data;
    } catch (error) {
        console.error("Get store data error:", error);
        throw error;
    }
};
