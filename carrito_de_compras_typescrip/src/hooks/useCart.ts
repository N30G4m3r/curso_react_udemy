import { useEffect, useMemo, useState } from "react"
import { db } from "../data/db"

const MAX_ITEM = 5;
const MIN_ITEM = 1;
const CART = 'cart'

export function useCart() {
    // Initial State
    const initialCart = () => {
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
    function addToCart(item) {
        const itemExists = cart.findIndex((value) => value.id === item.id)
        console.log(`existe el item con el id (${item.id})?: ${itemExists}`)
        console.log(`el item con el id (${item.id}) tiene: ${cart[itemExists]?.quantity}`)
        if (itemExists >= 0 && cart[itemExists].quantity >= MAX_ITEM) return;
        if (itemExists < 0) {
            console.log(`Agregar al carrito el item con ID: ${item.id}`)
            item.quantity = 1
            setCart([...cart, item])
        } else {
            const updatedCart = [...cart]
            console.log(`Ya existe el item con el ID: ${item.id}, que tiene una cantidad ${updatedCart[itemExists].quantity}`)
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id !== id || item.quantity >= MAX_ITEM) return item
            return {
                ...item,
                quantity: item.quantity + 1,
            }
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id) {
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