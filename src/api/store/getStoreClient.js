const getStoreClient = {
    getStoreIdList: async (params = {}) => {
        const url = new URL(
            `${import.meta.env.VITE_BASE_URL}/api/v2/stores/search`,
        );

        Object.keys(params).forEach((key) => {
            url.searchParams.append(key, params[key]);
        });
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch store ID list");
        }
        return await response.json();
    },
    getMerchantsByIdList: async (idList) => {
        if (!idList || !idList[0]) {
            return;
        }
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v2/stores/query`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(idList),
            },
        );
        if (!response.ok) {
            throw new Error(
                `Failed to fetch details for merchant ID: ${idList}`,
            );
        }
        return await response.json();
    },
};

export default getStoreClient;
