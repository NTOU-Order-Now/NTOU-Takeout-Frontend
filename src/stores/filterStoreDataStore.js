import { create } from "zustand";

const filterStoreDataStore = create((set) => ({
    isOpen: false,
    setIsOpen: (state) => set({ isOpen: state }),
    keyword: "",
    setKeyword: (state) => set({ keyword: state }),
    sortBy: "rating",
    setSortBy: (state) => set({ sortBy: state }),
    sortDir: "desc",
    setSortDir: (state) => set({ sortDir: state }),
}));

export default filterStoreDataStore;
