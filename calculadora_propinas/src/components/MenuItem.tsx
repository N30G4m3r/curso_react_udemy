import type { TMenuItem } from "../types"

type MenuItemProps = {
    item: TMenuItem
    addItemToOrder: (item: TMenuItem) => void
}

export default function MenuItem({ item, addItemToOrder }: MenuItemProps) {
    return (
        <button
            className="border-2 border-teal-400 hover:bg-teal-200 w-full p-3 flex justify-between rounded-lg"
            onClick={() => addItemToOrder(item)}
        >
            <p>{item.name}</p>
            <p className="font-black">${item.price}</p>
        </button>
    )
}