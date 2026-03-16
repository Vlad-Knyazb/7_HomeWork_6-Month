import { Button, Card, Form, Input, message } from "antd"
import { useAuthStore } from "../store/auth.store"
import { useMutation } from "@tanstack/react-query"
import { api } from "../api/axios"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const navigate = useNavigate()
    const { setUser } = useAuthStore()

    const loginMutation = useMutation({
        mutationFn: async (data) => {
            const res = await api.post("/auth/login", data)
            return res
        },
        onSuccess: (res) => {
            localStorage.setItem("accessToken", res.data.token.accessToken)
            localStorage.setItem("refreshToken", res.data.token.refreshToken)
            setUser(res.data.user)
            message.success("Login successful!")
            navigate("/")
        },
        onError: (error) => {
            message.error(error.response?.data?.message || "Login failed")
        }
    })

    const onFinish = (values) => {
        loginMutation.mutate(values)
    }

    return (
        <Card title="Login" style={{ maxWidth: 400, margin: "100px auto"}}>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item name="email" rules={[{ required: true }]}>
                    <Input placeholder="Email"/>
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password placeholder="Password"/>
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loginMutation.isPending} block>
                    Login
                </Button>
            </Form>
        </Card>
    )
}