const getMenuClient = {
    getMenuByMenuId: async (menuId) => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v2/menu/${menuId}`,
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch menu by ID: ${storeId}`);
        }
        const res = await response.json();
        return res;
    },
    getDishsByCategory: async (storeId, categoryName) => {
        console.log("getDishsByDishIds", storeId);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/stores/${storeId}/menu/dishes?category=${categoryName}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch dishes by category: ${categoryName}`);
        }

        const data = await response.json();
        return data;
    },
};

export default getMenuClient;