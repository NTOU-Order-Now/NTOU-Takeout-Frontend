import { create } from "zustand";

const useAllDishesStore = create((set) => ({
    dishes: {}, // store dishes' data
    setDishes: (newDishes) =>
        set((state) => ({
            dishes: {
                ...state.dishes,
                ...newDishes,
            },
        })),
}));

export default useAllDishesStore;
