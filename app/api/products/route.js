import dbConnect from "@/backend/config/dbConnect";
import Product from "@/backend/config/models/product";
import { APIFilters } from "@/backend/utils/APIFilters";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    const data = await req.json()
    try {
        dbConnect();
        // await newProduct()
        const product = await Product.create(data);
        return NextResponse.json({
            product
        });
    } catch (error) {
        const err = error.message
        return NextResponse.json({
            err
        })
    }
}

// get all products
export async function GET(req, res) {
    try {
        dbConnect();
        const urlPrams = req.nextUrl.searchParams;
        const resPerPage = 3
        const productsCount = await Product.countDocuments()
        
        const paramsObject = Object.fromEntries(urlPrams.entries())
        const apiFilters = new APIFilters(Product.find(),paramsObject).Search().filter();

        let products = await apiFilters.query
        
        const filteredProductsCount = products.length;
        apiFilters.pagination(resPerPage)

        products = await apiFilters.query.clone();
        return NextResponse.json({
            products,
            productsCount,
            resPerPage,
            filteredProductsCount
        })
    } catch (error) {
        return NextResponse.json({ error: error.message })
    }
}

// get a product

export async function PUT(req, res) {
    try {
        const id =await req.nextUrl.searchParams.get("id");
        dbConnect();
        const product = await Product.findById(id);
        return NextResponse.json({ product })
    } catch (error) {
        return NextResponse.json({ error: error.message })
    }
}


