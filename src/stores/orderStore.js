import { create } from "zustand";

const useOrderStore = create((set) => ({
    orderData: null,
    setOrderData: (order) => set({ orderData: order }),
}));

export default useOrderStore;
