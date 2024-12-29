import { API } from "../axios.config";
export const getStoreDataByParams = async (
    keyword,
    sortBy,
    sortDir,
    page,
    size,
) => {
    try {
        const res = await API.get(`/v3/stores/search`, {
            params: {
                keyword,
                sortBy,
                sortDir,
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
