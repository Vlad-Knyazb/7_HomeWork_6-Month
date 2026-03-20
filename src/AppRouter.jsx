import { Route, Routes, Navigate } from "react-router-dom"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { useAuthStore } from "./store/auth.store"
import Products from "./pages/Products"

export default function AppRouter() {
    const { isAuth } = useAuthStore()
    
    return (
        <Routes>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route 
                path="/" 
                element={isAuth ? <DashboardPage /> : <Navigate to="/login" />} 
            />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Ruote path="/cart" element={<Cart />} />
        </Routes>
    )
}