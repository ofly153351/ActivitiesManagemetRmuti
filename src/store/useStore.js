// store/useStore.js
import { create } from "zustand";
import { getUserbyClaim, getBranches, getFaculties } from "@/app/Utils/api"; // เพิ่ม API สำหรับ branches และ faculties
import { jwtDecodeToken } from "@/app/Utils/function";
import axios from 'axios';
import Cookies from 'js-cookie';
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
// store/useStore.js
const storedUser = typeof window !== "undefined" ? localStorage.getItem('user') : null;
const storedUserRole = typeof window !== "undefined" ? localStorage.getItem('userRole') : null;

export const useStore = create((set) => ({
    user: storedUser ? JSON.parse(storedUser) : null,
    userRole: storedUserRole ? JSON.parse(storedUserRole) : null,
    isLoading: false,

    login: async (payload) => {
        try {
            set({ isLoading: true });

            console.log('Attempting login with:', payload);

            // 1. Login API call
            const response = await axios.post(`${API_BASE}/login`, payload, {
                withCredentials: true, // สำคัญมาก ถ้าใช้ cookie
            });
            // console.log('Login response:', response.data);

            // 2. Get token from cookies
            // const token = Cookies.get('token');
            // // console.log('Token from cookies:', token);

            // if (!token) {
            //     throw new Error('Token not found in Cookies.');
            // }

            // // 3. Decode JWT
            // const decodedJwt = jwtDecodeToken(token);
            // console.log('Decoded JWT:', decodedJwt);

            // if (!decodedJwt) {
            //     throw new Error('Invalid token structure.');
            // }

            // 4. Set role from token

            try {
                // 5. Fetch user data
                const userResponse = await getUserbyClaim();
                // console.log('User data response:', userResponse.data);
                console.log(userResponse);
                set({ userRole: { role: userResponse.data.role } });


                const userData = {
                    role: userResponse.data.role || '',
                    user_id: userResponse.data.user_id,
                    title_name: userResponse.data.title_name,
                    first_name: userResponse.data.first_name,
                    last_name: userResponse.data.last_name,
                    phone: userResponse.data.phone,
                    code: userResponse.data.code,
                    branch: userResponse.data.branch_name || '',
                    email: userResponse.data.email || '',
                    year: userResponse.data.year || '',
                    superUser: userResponse.data.super_user,
                };

                // 6. Set user data
                set({ user: userData });
                console.log('User data set in store:', userData);

                // เก็บข้อมูลใน localStorage
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('userRole', JSON.stringify({ role: decodedJwt.role }));

                set({ isLoading: false });
                return response.data;
            } catch (userError) {
                console.error('Error fetching user data:', userError);
                set({ isLoading: false });
                throw userError;
            }
        } catch (error) {
            console.error('Login process error:', error);
            set({ isLoading: false });
            throw error;
        }
    },

    clearAll: () => {
        // เคลียร์ข้อมูลจากทั้งใน zustand store และ localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        set({
            user: null,
            userRole: null,
            isLoading: false
        });
    },

    branchesList: [],
    setBranchesList: (newBranches) => set({ branchesList: newBranches }),
    facultiesList: [],
    setFacultiesList: (newFaculties) => set({ facultiesList: newFaculties }),

    myEventList: [],
    setMyEventList: (newEventList) => set({ myEventList: newEventList }),

    setUser: (newDataUser) => {
        const currentUser = localStorage.getItem('user');
        const parsedCurrentUser = currentUser ? JSON.parse(currentUser) : {};

        // รวมข้อมูลผู้ใช้ปัจจุบันกับข้อมูลใหม่
        const updatedUser = {
            ...parsedCurrentUser,
            ...newDataUser
        };

        // อัปเดต localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // อัปเดต Zustand store
        set({ user: updatedUser });
    },


}));