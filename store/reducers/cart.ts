import {IProduct} from "../../models/products";

type cartItemType = {
    [key: string]: IProduct
}

export interface ICartState {
    items: cartItemType,
    totalAmount: number
}

const initialState: ICartState = {
    items: {},
    totalAmount: 0
};

export default function cartReducer(state: ICartState = initialState, action): ICartState {
    return state
}