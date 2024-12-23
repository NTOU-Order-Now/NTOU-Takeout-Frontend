import { create } from "zustand";

const useMenuStore = create((set) => ({
    selectedDish: null,
    setSelectedDish: (dishData) => set({ selectedDish: dishData }),
}));

export default useMenuStore;
