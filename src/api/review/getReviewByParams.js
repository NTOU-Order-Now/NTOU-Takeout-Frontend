import { API } from "../axios.config";
export const getReviewByParams = async (
    storeId,
    page,
    size,
) => {
    try {
        const res = await API.get(`/v1/reviews/${storeId}/query`, {
            params: {
                page,
                size,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Get store data error:", error);
        throw error;
    }
};
