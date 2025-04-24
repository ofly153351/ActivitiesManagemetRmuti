// store/useStore.js
import { create } from "zustand";
import { getUserbyClaim, getBranches, getFaculties } from "@/app/Utils/api";
import axios from "axios";
import { decryptText, encryptText } from "@/app/Utils/hash";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
const SECRET_KEY = process.env.NEXT_PUBLIC_ENCODE_ENV; // ถ้า deploy จริงให้ generate จาก backend หรือ env

const initializeRole = async () => {
    if (typeof window === "undefined") return null;

    const role = localStorage.getItem("userRole");
    const hash = localStorage.getItem("userRoleHash");
    if (!role || !hash) return null;

    const validHash = await generateHash(role, SECRET_KEY);
    if (validHash === hash) return role;

    // tampering detected
    console.warn("Role hash mismatch — possible tampering detected");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userRoleHash");
    return null;
};

const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;

export const useStore = create((set, get) => ({
    user: storedUser ? JSON.parse(storedUser) : null,
    userRole: null,
    isLoading: false,

    initUserRole: async () => {
        const validRole = await initializeRole();
        set({ userRole: validRole });
    },

    login: async (payload) => {
        try {
            set({ isLoading: true });

            const response = await axios.post(`${API_BASE}/login`, payload, {
                withCredentials: true,
            });

            const userResponse = await getUserbyClaim();


            const userData = {
                user_id: userResponse.data.user_id,
                title_name: userResponse.data.title_name,
                first_name: userResponse.data.first_name,
                last_name: userResponse.data.last_name,
                phone: userResponse.data.phone,
                code: userResponse.data.code,
                branch: userResponse.data.branch_name || "",
                email: userResponse.data.email || "",
                year: userResponse.data.year || "",
                superUser: userResponse.data.super_user,
            };

            set({ user: userData, userRole: userData.role });
            const hash = encryptText(userResponse.data.role, SECRET_KEY);
            localStorage.setItem("userRoleHash", hash);
            localStorage.setItem("user", JSON.stringify(userData));



            set({ isLoading: false });
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            set({ isLoading: false });
            throw error;
        }
    },

    userRoleHash: null,

    initUserRoleHash: () => {
        const storedHash = localStorage.getItem("userRoleHash");
        if (storedHash) {
            // ตรวจสอบการเข้ารหัสว่าเป็นไปตามที่คาด
            const decryptedHash = decryptText(storedHash, SECRET_KEY);
            set({ userRoleHash: decryptedHash });
        }
    },

    clearAll: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userRoleHash");
        set({ user: null, userRole: null, isLoading: false });
    },

    branchesList: [],
    setBranchesList: (newBranches) => set({ branchesList: newBranches }),

    facultiesList: [],
    setFacultiesList: (newFaculties) => set({ facultiesList: newFaculties }),

    myEventList: [],
    setMyEventList: (newEventList) => set({ myEventList: newEventList }),

    setUser: (newDataUser) => {
        const currentUser = localStorage.getItem("user");
        const parsedCurrentUser = currentUser ? JSON.parse(currentUser) : {};

        const updatedUser = {
            ...parsedCurrentUser,
            ...newDataUser,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        set({ user: updatedUser });
    },
}));

