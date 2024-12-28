import { create } from "zustand";

const useReviewForm = create((set) => ({
    storeDescription: null,
    setStoreDescription: (description) => {
        set({ storeDescription: description });
    },

    storeAverageSpend: undefined,
    setstoreAverageSpend: (averageSpend) =>
        set({ storeAverageSpend: averageSpend }),

    storeRating: 0,
    setStoreRating: (rating) => {
        const validRating = Math.min(Math.max(rating, 1), 5);
        set({ storeRating: validRating });
    },

    reset: () =>
        set({ storeDescription: "", storeAverageSpend: 0, storeRating: 0 }),
}));

export default useReviewForm;
