"use client"
import CartContext from "@/context/CardContext";
import Link from "next/link";
import { useContext } from "react";

const Cart = () => {
    const { addItemToCart, cart,deleteItemFromCart } = useContext(CartContext)
    const increseQuantities = (cartItem) => {
        const newQty = cartItem.quantity + 1
        const item = { ...cartItem, quantity: newQty }
        if (newQty > Number(cartItem.stock)) return;
        addItemToCart(item)
    }
    const decreseQuantities = (cartItem) => {
        const newQty = cartItem.quantity - 1
        const item = { ...cartItem, quantity: newQty }
        if (newQty <= 0) return;
        addItemToCart(item)
    }
    
    const amountWithoutTex=cart?.cartItems?.reduce((acc,item)=>acc+item.price*item.quantity,0).toFixed(2)
    const texAmount = (amountWithoutTex*0.15).toFixed(2)
    const totalUnits = cart?.cartItems?.reduce((x,item)=>x+item.quantity,0)
    return (
        <>
            <section className="py-5 sm:py-7 bg-blue-100">
                <div className="container max-w-screen-xl mx-auto px-4">
                    <h2 className="text-3xl font-semibold mb-2">{cart?.cartItems?.length || 0} Item(s) in Cart</h2>
                </div>
            </section>
            {
                cart?.cartItems?.length && (
                    <section className="py-10">
                        <div className="container max-w-screen-xl mx-auto px-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <main className="md:w-3/4">
                                    <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                                        {
                                            cart.cartItems.map((cartItem) => (
                                                <div>
                                                    <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                                                        <div className="w-full lg:w-2/5 xl:w-2/4">
                                                            <figure className="flex leading-5">
                                                                <div>
                                                                    <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                                                        <img src={"/logo192.png"} alt="Title" />
                                                                    </div>
                                                                </div>
                                                                <figcaption className="ml-3">
                                                                    <p>
                                                                        <a href="#" className="hover:text-blue-600">
                                                                            {cartItem.name}
                                                                        </a>
                                                                    </p>
                                                                    <p className="mt-1 text-gray-400"> Seller: {cartItem.seller}</p>
                                                                </figcaption>
                                                            </figure>
                                                        </div>
                                                        <div className="w-24">
                                                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                                                <button
                                                                    data-action="decrement"
                                                                    onClick={() => decreseQuantities(cartItem)}
                                                                    className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                                                >
                                                                    <span className="m-auto text-2xl font-thin">−</span>
                                                                </button>
                                                                <input
                                                                    type="number"
                                                                    className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                                                                    name="custom-input-number"
                                                                    value={cartItem.quantity}
                                                                    readOnly
                                                                ></input>
                                                                <button
                                                                    data-action="increment"
                                                                    onClick={() => increseQuantities(cartItem)}
                                                                    className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                                                >
                                                                    <span className="m-auto text-2xl font-thin">+</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="leading-5">
                                                                <p className="font-semibold not-italic">${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
                                                                <small className="text-gray-400">
                                                                    {" "}
                                                                    ${cartItem.price} / per item{" "}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="flex-auto">
                                                            <div className="float-right">
                                                                <a onClick={()=>deleteItemFromCart(cartItem.product)} className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                                                                    Remove
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr className="my-4" />
                                                </div>
                                            ))
                                        }
                                    </article>
                                </main>
                                <aside className="md:w-1/4">
                                    <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                                        <ul className="mb-5">
                                            <li className="flex justify-between text-gray-600  mb-1">
                                                <span>Price before Tax:</span>
                                                <span>${amountWithoutTex}</span>
                                            </li>
                                            <li className="flex justify-between text-gray-600  mb-1">
                                                <span>Total Units:</span>
                                                <span className="text-green-500">{totalUnits||0} (Units)</span>
                                            </li>
                                            <li className="flex justify-between text-gray-600  mb-1">
                                                <span>TAX:</span>
                                                <span>${texAmount||0}</span>
                                            </li>
                                            <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                                                <span>Total price:</span>
                                                <span>{(Number(amountWithoutTex)+Number(texAmount)).toFixed(2)}</span>
                                            </li>
                                        </ul>

                                        <a className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer">
                                            Continue
                                        </a>

                                        <Link
                                            href="/"
                                            className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                                        >
                                            Back to shop
                                        </Link>
                                    </article>
                                </aside>
                            </div>
                        </div>
                    </section>
                )
            }
        </>
    );
};

export default Cart;