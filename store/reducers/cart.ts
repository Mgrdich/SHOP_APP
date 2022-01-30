import {Product} from "../../models/products";
import {CART_ACTIONS} from "../actions/cart";
import {CartItem} from "../../models/cartItem";
import {ActionType} from "../actions/types";
import createReducer from "./helper";
import FU from "../../util/FunctionUtil";

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
        cartItem.sum = FU.toFixedNumber(cartItem.sum + cartItem.prodPrice);
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
    let totalAmount: number = FU.toFixedNumber(state.totalAmount - currentCartItem.sum);

    delete currentCartItems[action.productId];
    return {
        ...state,
        items: currentCartItems,
        totalAmount
    };
}

function setQuantity(state: ICartState, action: cartActionType): ICartState {
    let currentCartItems: cartItemType = {...state.items};
    let currentCartItem: CartItem = {...currentCartItems[action.productId]}; // TODO check if this needs destructure ?
    let totalAmount: number = FU.toFixedNumber(state.totalAmount - currentCartItem.sum); // remove price from cart

    currentCartItem.quantity = action.quantity > 0 ? action.quantity : 1;
    currentCartItem.sum = currentCartItem.quantity * currentCartItem.prodPrice;

    totalAmount += currentCartItem.sum; // add new price

    currentCartItems[action.productId] = currentCartItem;


    return {
        ...state,
        items: currentCartItems,
        totalAmount
    }
}

function clearCart(state: ICartState, action: cartActionType): ICartState {
    return initialState;
}

function deleteProductFromCart(state: ICartState, action: cartActionType): ICartState {
    console.log("Worksss");
    if (!state.items[action.pId]) {
        return state
    }
    const updatedItems = {...state.items}

    const itemTotal = state.items[action.pId].sum;
    delete updatedItems[action.pId];

    return {
        ...state,
        items: updatedItems,
        totalAmount: FU.toFixedNumber(state.totalAmount - itemTotal)
    };
}

const cartReducer = createReducer<ICartState, CART_ACTIONS>(initialState, {
    [CART_ACTIONS.ADD_TO_CART]: addToCart,
    [CART_ACTIONS.REMOVE_FROM_CART]: removeFromCart,
    [CART_ACTIONS.SET_ITEM_QUANTITY]: setQuantity,
    [CART_ACTIONS.CLEAR_CART]: clearCart,
    [CART_ACTIONS.DELETE_PRODUCT]: deleteProductFromCart
});

export default cartReducer;