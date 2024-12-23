import { create } from "zustand";

const useStoreForm = create((set) => ({
    name: "",
    setStoreName: (name) => set({ storeName: name }),

    description: "",
    setDescription: (description) => set({ storeDescription: description }),

    file: null,
    filePath: "",
    setFile: (file, filePath) => set({ file, filePath: filePath }),

    address: "",
    setAddress: (address) => set({ storeAddress: address }),

    phoneNumber: "",
    setPhoneNumber: (phone) => set({ storePhone: phone }),

    businessHours: Array(7)
        .fill()
        .map(() =>
            Array(2)
                .fill()
                .map(() => ({
                    first: "09:00",
                    second: "18:00",
                })),
        ),
    setBusinessHours: (hours) => set({ businessHours: hours }),
}));

export default useStoreForm;
