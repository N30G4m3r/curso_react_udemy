import { formatCurrency } from "../helpers"
import type { TMenuItemId, TOrderItem } from "../types"

type OrderContentsProps = {
    order: TOrderItem[]
    removeItemFromOrder: (item: TMenuItemId) => void
}
export default function OrderContents({ order, removeItemFromOrder }: OrderContentsProps) {
    const orderList = () => {
        return order.map(orderItem => (
            <div
                key={orderItem.id}
                className="flex justify-between items-center border-t last-of-type:border-b border-gray-200 py-5"
            >
                <div>
                    <p className="text-lg">
                        {orderItem.name} - {formatCurrency(orderItem.price)}
                    </p>
                    <p className="font-black">
                        Cantidad: {orderItem.quantity} - {formatCurrency(orderItem.price * orderItem.quantity)}
                    </p>
                </div>
                <button
                    className="bg-red-600 hover:bg-red-200 hover:border hover:border-red-600 h-8 w-8 rounded-full text-white font-black"
                    onClick={() => removeItemFromOrder(orderItem.id)}
                >
                    X
                </button>
            </div>
        ))
    }
    return (
        <div>
            <h2 className="font-black text-4xl">Consumos</h2>

            <div className="space-y-3 mt-10">
                {orderList()}
            </div>
        </div>
    )
}