import { create } from 'zustand';

const useReviewForm = create((set) => ({
    storeDescription: '',
    setStoreDescription: (description) => set({ storeDescription: description }),

    storeAverageSpend: null,
    setstoreAverageSpend: (averageSpend) => set({ storeAverageSpend: averageSpend }),

    storeRating: 0,
    setStoreRating: (rating) => {
        const validRating = Math.min(Math.max(rating, 1), 5);
        set({ storeRating: validRating });
    },
}));

export default useReviewForm;
