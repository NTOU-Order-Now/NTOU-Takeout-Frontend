import { create } from "zustand";

const useSidebarStore = create((set) => ({
    title: "",
    setTitle: (title) => set({ title: title }),
    isOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    closeSidebar: () => set({ isOpen: false }),
}));

export default useSidebarStore;
