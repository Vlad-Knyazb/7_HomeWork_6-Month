import { useQuery } from "@tanstack/react-query";
import { Alert, Card, Spin } from "antd";
import { useParams } from "react-router-dom";
import { getProductById } from "../store/productStore";


export function ProductDetail() {

    const { id } = useParams()
    const useProduct  = (id) => {
        return useQuery({
            queryKey: [`product`, id],
            queryFn: () => getProductById(id)
        })
    }

    const { data, isLoading, isError } = useProduct(id)

    if (isLoading) {
        return <Spin size="large" />
    }

    if (isError) {
        return <Alert message="Ошибка загрузки продукта" type="error" />
    }

    return (
        <Card title={data.title} style={{ maxWidth: 500 }}>
            <p><b>Дата создания:</b> {data.createdAt}</p>
            <p><b>Категория:</b> {data.categories?.title}</p>
            <p>{data.description}</p>
        </Card>
    )
}