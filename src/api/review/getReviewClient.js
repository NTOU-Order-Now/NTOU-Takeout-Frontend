const getReviewClient = {
    getReivewByIds: async (reviewIds) => {
        console.log("getReviewByIds", reviewIds);
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/api/v1/stores/reviews/query`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewIds),
            },
        );
        if (!response.ok) {
            throw new Error(
                `Failed to fetch details for review ID: ${reviewIds}`,
            );
        }
        return await response.json();
    },
};

export default getReviewClient;
