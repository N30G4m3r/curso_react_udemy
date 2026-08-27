import { useEffect, useMemo, useState } from "react"
import { db } from "../data/db"
import type { TCartItem, TGuitar, TGuitarID } from "../types";

const MAX_ITEM = 5;
const MIN_ITEM = 1;
const CART = 'cart'

export function useCart() {
    // Initial State
    const initialCart = (): TCartItem[] => {
        const localStorageCart = localStorage.getItem(CART)
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    // State
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)
    // Effect
    useEffect(() => {
        localStorage.setItem(CART, JSON.stringify(cart))
    }, [cart])

    // Function
    function addToCart(item: TGuitar) {
        const itemExists = cart.findIndex((value) => value.id === item.id)
        if (itemExists >= 0 && cart[itemExists].quantity >= MAX_ITEM) return;
        if (itemExists < 0) {
            const newItem: TCartItem = { ...item, quantity : 1}
            setCart([...cart, newItem])
        } else {
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }
    }

    function removeFromCart(id: TGuitarID) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id: TGuitarID) {
        const updatedCart = cart.map(item => {
            if (item.id !== id || item.quantity >= MAX_ITEM) return item
            return {
                ...item,
                quantity: item.quantity + 1,
            }
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id: TGuitarID) {
        const updatedCart = cart.map(item => {
            if (item.id !== id || item.quantity <= MIN_ITEM) return item
            return {
                ...item,
                quantity: item.quantity - 1,
            }
        })
        setCart(updatedCart)
    }

    function cleanCart() {
        setCart([])
    }

    //State derived from props
    const isCartEmpty = useMemo(() => cart.length === 0, [cart]);
    // const totalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = useMemo(() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart]);

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cleanCart,
        isCartEmpty,
        totalPrice,
    }
}