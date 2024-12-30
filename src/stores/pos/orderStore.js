import { create } from "zustand";

const orderStore = create((set) => ({
    acceptedListNumber: 1,
    setAcceptedListNumber: (state) => set({ acceptedListNumber: state }),
    unacceptedListNumber: 1,
    setUnacceptedListNumber: (state) => set({ unacceptedListNumber: state }),
}));

export default orderStore;
