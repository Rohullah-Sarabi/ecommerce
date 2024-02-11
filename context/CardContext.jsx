"use client"

const { useRouter } = require("next/navigation");
const { createContext, useState, useEffect } = require("react")

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const router = useRouter();

    useEffect(() => {
        setCartToState()
    }, [])

    const setCartToState = () => {
        setCart(
            localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
        )
    }

    const addItemToCart = ({
        product,
        name,
        price, image
        , stock, seller, quantity = 1
    }) => {
        const items = {
            product,
            name,
            price, image
            , stock, seller, quantity
        }
        const isItemExist = cart?.cartItems?.find((i) => i.product == items.product)
        console.log(isItemExist)
        let newCartItems;
        if (isItemExist) {
            newCartItems = cart?.cartItems?.map((i) =>
                i.product === isItemExist.product ? items : i)
        } else {
            newCartItems = [...(cart?.cartItems || []), items]
        }
        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))
        setCartToState()
    }

    const deleteItemFromCart = (id)=>{
        const newCartItems = cart?.cartItems?.filter((item)=>item.product!==id)
        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))
        setCartToState()
    }
    return <CartContext.Provider value={{ cart, addItemToCart,deleteItemFromCart }}>
        {children}
    </CartContext.Provider>
}

export default CartContext;