import {Product} from "../../models/products";
import {CART_ACTIONS} from "../actions/cart";

type cartItemType = {
    [key: string]: Product
}

export interface ICartState {
    items: cartItemType,
    totalAmount: number
}

const initialState: ICartState = {
    items: {},
    totalAmount: 0
};

type cartActionType = {
    type: CART_ACTIONS | undefined
}

export default function cartReducer(state: ICartState = initialState, action: cartActionType): ICartState {
    switch (action.type) {
        case CART_ACTIONS.ADD_TO_CART:

    }
    return state
}