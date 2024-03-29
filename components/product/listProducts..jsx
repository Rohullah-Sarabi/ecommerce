"use client"

import Filters from "../layout/Filter";
import CustomPagination from "../layout/customPagination";
import ProductItem from "./ProductItem";


function ListProducts({ data }) {
    return (
        <section className="py-12 border">
            <div className="container max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col md:flex-row -mx-4">
                    <Filters />
                    <main className="md:w-2/3 lg:w-3/4 px-3">
                        {
                            data?.products?.map((item) => <ProductItem product={item} key={item._id} />)
                        }
                        <CustomPagination resPerPage={data?.resPerPage} productCount={data?.filteredProductsCount}/>
                    </main>
                </div>
            </div>

        </section>
    )
}

export default ListProducts;