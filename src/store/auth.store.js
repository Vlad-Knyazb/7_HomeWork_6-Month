import { create } from "zustand"
import { authApi } from "../api/auth.api"

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,

    register: async ( username, email, password ) => {
        set({ loading: true })
        try {
            await authApi.register({ username, email, password })
            set({ loading: false })
        } catch (e) {
            set({ loading: false })
            throw e
        }
    },

    login: async ( email, password ) => {
        set({ loading: true })
        try {
            const res = await authApi.login({ email, password })
            set({ user: res.data.user, loading: false })
        } catch (e) {
            set({ loading: false })
            throw e
        }
    }
}))