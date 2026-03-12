import { Button, Card, Form, Input, message } from "antd"
import { useMutation } from "@tanstack/react-query"
import { authApi } from "../api/auth.api"
import { useNavigate } from "react-router-dom"

export default function RegisterPage () {
    const navigate = useNavigate()

    const registerMutation = useMutation({
        mutationFn: (data) => authApi.register(data),
        onSuccess: () => {
            message.success("Registration successful! Please login.")
            navigate("/login")
        },
        onError: (error) => {
            message.error(error.response?.data?.message || "Registration failed")
        }
    })

    const onFinish = (values) => {
        registerMutation.mutate(values)
    }

    return (
        <Card title="Register" style={{ maxWidth: 400, margin: "100px auto"}}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="username" rules={[{ required: true }]}>
                    <Input placeholder="Username"/>
                </Form.Item>

                <Form.Item name="email" rules={[{ required: true }]}>
                    <Input placeholder="Email"/>
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password placeholder="Password"/>
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={registerMutation.isPending} block>
                    Register
                </Button>
            </Form>
        </Card>
    )
}