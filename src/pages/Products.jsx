import { Button, Card } from "antd"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProducts } from "../store/productStore"
import { addToCart } from "../store/cartStore"
import { useNavigate } from "react-router-dom"


export default function Products () {
    const queryClient = useQueryClient()

    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    })

    const addMutation = useMutation({
        mutationFn: addToCart,
        onSuccess: () => {
            queryClient.invalidateQueries([`cart`])
        }
    })

    const navigate = useNavigate()

    if (isLoading) return <p>Loading...</p>

    return (
        <div style={{ padding: 20, display: "flex", flexWrap: "wrap", gap: 20 }}>

            {products.map((product) => (
                <Card
                    key={product.id}
                    title={product.title.slice(0, 20)}
                    cover={<img src={product?.image ? product?.image : `https://odoo-community.org/web/image/product.template/3936/image_1920?unique=8cb69f6`} alt="" />}
                    style={{
                        border: "1px solid #ccc",
                        marginBottom: 10,
                        padding: 10,
                        maxWidth: `300px`
                    }}
                    onClick={() => navigate(`/products/${product.id}`)}
                >
                    <p>{product.description.slice(0, 20)}</p>
                    <p>
                        <b>Category:</b> {product.categories?.title}
                    </p>

                    <Button onClick={() => addMutation.mutate(product.id)}>
                        Add to cart
                    </Button>
                </Card>
            ))}
        </div>
    )
}