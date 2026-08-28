export type TMenuItem = {
    id: number;
    name: string;
    price: number
}

export type TOrderItem = TMenuItem & {
    quantity: number;
}

export type TMenuItemId = TMenuItem['id']

export type TTipOption = {
    id: string;
    value: number;
    label: string;
}