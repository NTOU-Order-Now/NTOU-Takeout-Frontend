import { create } from 'zustand';

export const useActiveTabStore = create((set) => ({
    activeTab: '',
    setActiveTab: (tab) => set({ activeTab: tab }),
}));
