import ProductDetails from "@/components/product/ProductDetail";
import axios from "axios";
import { stringify } from "postcss";

const getProductDetails = async (id) => {
  console.log("details page:",id)
    const { data } = await axios.put(`${process.env.API_URL}/api/products?id=${id}`);
    return data?.product;
}

async function ProductDetailsPage({ params }) {
    const product = await getProductDetails(params.id);

    return (
        <ProductDetails product={product}/>
    )
}

export default ProductDetailsPage;