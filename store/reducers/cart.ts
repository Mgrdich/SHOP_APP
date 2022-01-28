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

function addToCart(state: ICartState, action: cartActionType): ICartState {
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

function removeFromCart(state: ICartState, action: cartActionType): ICartState {
    let currentCartItems: cartItemType = {...state.items};
    let currentCartItem: CartItem = currentCartItems[action.productId];
    let totalAmount: number = state.totalAmount - currentCartItem.sum;

    delete currentCartItems[action.productId];
    return {
        ...state,
        items: currentCartItems,
        totalAmount
    };
}

const cartReducer = createReducer<ICartState, CART_ACTIONS>(initialState, {
    [CART_ACTIONS.ADD_TO_CART]: addToCart,
    [CART_ACTIONS.REMOVE_FROM_CART]: removeFromCart
});

export default cartReducer;