import { useMemo } from "react"
import type { TOrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    order: TOrderItem[];
    tip: number;
    placeOrder: () => void;
}
export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {
    console.log(`OrderItems: ${order.length}`)
    const subTotalAmount = useMemo(
        () => order.reduce(
            (total, orderItem) => total + (orderItem.price * orderItem.quantity), 
            0
        ), 
        [order]
    )
    const tipAmount = useMemo(() => subTotalAmount * tip, [tip, subTotalAmount])
    const totalAmount = useMemo(() => subTotalAmount + tipAmount, [subTotalAmount, tipAmount])
    return (
        <>
            <div className="space-y-3">
                <h2 className="font-black text-2xl">Total y Propina:</h2>
                <p>
                    Subtotal a pagar: {''}
                    <span className="font-bold">{formatCurrency(subTotalAmount)}</span>
                </p>

                <p>
                    Propina: {''}
                    <span className="font-bold">{formatCurrency(tipAmount)}</span>
                </p>

                <p>
                    Total a pagar: {''}
                    <span className="font-bold">{formatCurrency(totalAmount)}</span>
                </p>
            </div>

            <button
                className="w-full bg-black p-3 uppercase text-white font-bold mt-10"
                disabled={totalAmount <= 0}
                onClick={placeOrder}
            >
                Guardar Orden
            </button>
        </>
    )
}