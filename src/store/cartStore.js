import { api } from "../api/axios"


export const getCart = async () => {
    const res = await api.get("/cart")
    return res.data
}

export const addToCart = async (productId) => {
    return api.post(`/cart`, { productId, quantity: 1 })
}

export const removeFromCart = async (productId) => {
    return api.delete(`/cart/${productId}`)
}