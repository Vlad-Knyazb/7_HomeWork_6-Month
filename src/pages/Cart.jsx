import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Button, Card } from "antd"
import { getCart, removeFromCart } from "../store/cartStore"


export default function Cart() {
    const queryClient = useQueryClient()

    const { data: cart, isLoading } = useQuery({
        queryKey: ["/cart"],
        queryFn: getCart
    })

    const removeMutation = useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.invalidateQueries([`cart`])
        }
    })

    if (isLoading) return <p>Loading...</p>
    if (!cart.length) return <p>Cart is empty</p>

    return (
        <div style={{ padding: 20, display: "flex", flexWrap: "wrap", gap: 20 }}>
            {cart.map((item) => (
                 <Card
                    key={item.id}
                    title={item.product.title}
                    cover={<img src={item.product?.image ? item.product?.image : `https://odoo-community.org/web/image/product.template/3936/image_1920?unique=8cb69f6`} alt="" />}
                    style={{
                        border: "1px solid #ccc",
                        marginBottom: 10,
                        padding: 10,
                        maxWidth: `300px`
                    }}
                >
                    <p>{item.product.description}</p>
                    <p>
                        <b>Category:</b> {item.product.categories?.title}
                    </p>

                    <Button onClick={() => removeMutation.mutate(item.product.id)}>
                        Remove
                    </Button>
                </Card>
            ))}
        </div>
    )
}