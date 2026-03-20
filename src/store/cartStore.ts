import { api } from "../api/axios"

interface Product {
    id: number
    title: string
    description: string
    image?: string
    categories?: {
        title: string
    }
}

interface CartItem {
    id: number
    product: Product
    quantity: number
}

export const getCart = async (): Promise<CartItem[]> => {
    const res = await api.get("/cart")
    return res.data
}

export const addToCart = async (productId: number) => {
    return api.post(`/cart`, { productId, quantity: 1 })
}

export const removeFromCart = async (productId: number) => {
    return api.delete(`/cart/${productId}`)
}