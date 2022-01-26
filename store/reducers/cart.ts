import {Product} from "../../models/products";
import {CART_ACTIONS} from "../actions/cart";
import {CartItem} from "../../models/cartItem";
import {ActionType} from "../actions/types";
import createReducer from "./helper";

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

type cartActionType = ActionType<CART_ACTIONS>

function addToCard(state: ICartState, action: cartActionType): ICartState {
    const addedProduct: Product = action.product;
    const prodPrice: number = addedProduct.price;
    const prodTitle: string = addedProduct.title;

    let cartItem: CartItem;

    if (state.items[addedProduct.id]) {
        let item: CartItem = state.items[addedProduct.id];
        cartItem = new CartItem({...item});
        cartItem.quantity++;
        cartItem.sum += cartItem.prodPrice;
    } else {
        cartItem = new CartItem({
            quantity: 1,
            prodPrice: prodPrice,
            prodTitle: prodTitle,
            sum: prodPrice
        });
    }

    return {
        ...state,
        items: {
            ...state.items,
            [addedProduct.id]: cartItem
        },
        totalAmount: state.totalAmount + cartItem.prodPrice
    }
}

const cartReducer = createReducer<ICartState, CART_ACTIONS>(initialState, {
    [CART_ACTIONS.ADD_TO_CART]: addToCard
});

export default cartReducer;