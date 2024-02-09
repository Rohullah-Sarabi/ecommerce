import { NextResponse } from "next/server";
import Product from "../config/models/product";

export const newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    return res.status(201).json({
        product
    });
}

export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            products
        })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

export const getProduct = async (req,res,next)=>{
    try {
        const product = await Product.findById(req.query.id);
        if(!product){
            return res.status(400).json({error:"product not found!"})
        }
        return res.status(200).json({product})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}