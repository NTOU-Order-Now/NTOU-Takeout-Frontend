// stores/storeInfoStore.js
import { create } from 'zustand';

const useStoreForm = create((set) => ({
    storeName: '',
    setStoreName: (name) => set({ storeName: name }),
    
    storeDescription: '',
    setStoreDescription: (description) => set({ storeDescription: description }),
    
    file: null,
    filePath: '',
    setFile: (file, filePath) => set({ file, filePath: filePath}),
    
    storeAddress: '',
    setStoreAddress: (address) => set({ storeAddress: address }),
    
    storePhone: '',
    setStorePhone: (phone) => set({ storePhone: phone }),
    
    businessHours: Array(7).fill(
        Array(2).fill({
        start: '09:00',
        end: '18:00',
        })
    ),
    setBusinessHours: (hours) => set({ businessHours: hours }),
}));

export default useStoreForm;
