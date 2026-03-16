import { create } from "zustand"
import { api } from "../api/axios"

export const useAuthStore = create((set) => ({
    profile: null,
    loading: false,
    isAuth: false,

    setUser: (user) => {
        set({ profile: user, isAuth: true })
    },

    register: async (data) => {
        await api.post("/auth/register", data)
        set({ loading: false })
    },

    login: async (data) => {
        const res = await api.post("/auth/login", data)

        localStorage.setItem("accessToken", res.data.token.accessToken)
        localStorage.setItem("refreshToken", res.data.token.refreshToken)

        set({ isAuth: true })
        return res
    },
    
    getProfile: async () => {
        set({ loading: true })
        try {
            const res = await api.get("/profile")
            set({ profile: res.data, loading: false })
        } catch (error) {
            set({ loading: false })
            throw error
        }
    },

    logout: async () => {
        const refreshToken = localStorage.getItem("refreshToken")

        try {
            await api.post("/auth/logout", { refreshToken })
        } catch (e) {
            console.error("Logout error", e)
        } 

        localStorage.clear()
        set({ profile: null, isAuth: false })
    }
}))