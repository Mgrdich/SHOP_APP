import {Product} from "../../models/products";
import {ActionType} from "./types";
import {PRODUCTS_ACTIONS} from "./products";

export enum CART_ACTIONS {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    SET_ITEM_QUANTITY = 'SET_ITEM_QUANTITY',
    CLEAR_CART = 'CLEAR_CART',
    DELETE_PRODUCT= PRODUCTS_ACTIONS.DELETE_PRODUCT
}

type CartAction = ActionType<CART_ACTIONS>

export const addToCart = (product: Product): CartAction => {
    return {
        type: CART_ACTIONS.ADD_TO_CART,
        product: product
    }
};

export const removeFromCart = (productId: string): CartAction => {
    return {
        type: CART_ACTIONS.REMOVE_FROM_CART,
        productId
    }
};

export const clearCart = (): CartAction => {
    return {
        type: CART_ACTIONS.CLEAR_CART
    }
};

export const setItemQuantity = (productId: string, quantity: number): CartAction => {
    return {
        type: CART_ACTIONS.REMOVE_FROM_CART,
        productId,
        quantity
    }
};