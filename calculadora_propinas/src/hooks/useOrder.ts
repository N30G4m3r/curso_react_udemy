import { useState } from "react"
import type { TMenuItem, TMenuItemId, TOrderItem } from "../types"

export default function useOrder() {
    const [order, setOrder] = useState<TOrderItem[]>([])
    const [tip, setTip] = useState(0)

    const addItemToOrder = (item: TMenuItem) => {
        const itemExits = order.find(orderItem => orderItem.id === item.id)
        if (!itemExits) {
            const newItem: TOrderItem = { ...item, quantity: 1 };
            setOrder([...order, newItem]);
            return;
        }
        const updateOrder = order.map(orderItem => {
            if (orderItem.id !== itemExits.id) return orderItem
            return {
                ...orderItem,
                quantity: orderItem.quantity + 1
            }
        })
        setOrder(updateOrder)
        return;
    } 

    const removeItemFromOrder = (itemId: TMenuItemId) => {
        setOrder(order.filter(orderItem => orderItem.id !== itemId))
    }

    const setTipProcentage = (procentage: number) => {
        setTip(procentage)
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }

    return {
        order,
        tip,
        setTipProcentage,
        addItemToOrder,
        removeItemFromOrder,
        placeOrder,
    }
}