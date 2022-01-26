import {Product} from "../../models/products";
import {CART_ACTIONS} from "../actions/cart";
import {CartItem} from "../../models/cartItem";

type cartItemType = {
    [key: string]: CartItem
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
    type: CART_ACTIONS | undefined,
    [key: string]: any
}

export default function cartReducer(state: ICartState = initialState, action: cartActionType): ICartState {
    switch (action.type) {
        case CART_ACTIONS.ADD_TO_CART:
            const addedProduct: Product = action.product;
            const prodPrice: number = addedProduct.price;
            const prodTitle: string = addedProduct.title;


            let cartItem:CartItem;

            if (state.items[addedProduct.id]) {
                cartItem = {...state.items[addedProduct.id]};
                cartItem.quantity++;
                cartItem.sum += cartItem.prodPrice;
            } else {
                cartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }
            
            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: cartItem
                }
            }

    }
    return state
}