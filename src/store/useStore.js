// store/useStore.js
import { create } from "zustand";

const useStore = create((set) => ({
    user: null,
    // branches: null,
    faculties: [],
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    // setBranches: (branches) => set({ branches }),
    // clearBranches: () => set({ branches: null }),
    setFaculties: (faculties) => set({ faculties }),
    clearFaculties: () => set({ faculties: null }),
}));

export default useStore;