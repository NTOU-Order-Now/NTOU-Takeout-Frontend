import { create } from "zustand";

const userInfoStore = create((set) => ({
    user: undefined,
    isLoading: false,
    error: null,
    isError: false,
    setUser: (user) => {
        set(() => ({
            user: user,
        }));
    },
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setIsError: (isError) => set({ isError }),
}));

export default userInfoStore;
