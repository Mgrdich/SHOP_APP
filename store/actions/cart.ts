import {Product} from "../../models/products";
import {ActionType} from "./types";

export enum CART_ACTIONS {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    SET_ITEM_QUANTITY = 'SET_ITEM_QUANTITY'
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

export const setItemQuantity = (productId: string, quantity: number): CartAction => {
    return {
        type: CART_ACTIONS.REMOVE_FROM_CART,
        productId,
        quantity
    }
};