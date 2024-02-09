import ListProducts from "@/components/product/listProducts.";
import axios from "axios";

import queryString from "query-string";

async function getProducts(searchParams){
  const urlParams = {
    keyword:searchParams.keyword,
    page:searchParams.page,
    category:searchParams.category,
    "price[gte]":searchParams.min,
    "price[lte]":searchParams.max,
  }
  const searchQuery = queryString.stringify(urlParams)
  const {data} = await axios.get(`${process.env.API_URL}/api/products?${searchQuery}`);
  return data;
}

export default async function Home({searchParams}) {
  const products = await getProducts(searchParams)
  return <ListProducts data={products}/>;
}
