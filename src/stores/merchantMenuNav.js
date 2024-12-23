import { create } from "zustand";

const useNavStore = create((set) => ({
    navbarItems: [], // Default nav items
    nowPage: 0, // Now page nav
    setNowPage: (pageIndex) => set({ nowPage: pageIndex }), // Update now page
    setNavbarItems: (items) => set({ navbarItems: items }), // Update nav state
}));

export default useNavStore;
