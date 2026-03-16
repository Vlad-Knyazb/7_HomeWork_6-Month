import { useEffect } from "react"
import { useAuthStore } from "../store/auth.store"
import { useNavigate } from "react-router-dom"

export default function DashboardPage () {
    const navigate = useNavigate()
    const { profile, getProfile, logout, loading } = useAuthStore()

    useEffect(() => {
        getProfile()
    }, [])

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <h1>Dashboard</h1>

            {profile && (
                <div>
                    <p><b>ID:</b> {profile.id}</p>
                    <p><b>Username:</b> {profile.username}</p>
                    <p><b>Email:</b> {profile.email}</p>
                </div>
            )}

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}