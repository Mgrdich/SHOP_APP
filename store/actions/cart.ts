import {Product} from "../../models/products";
import {ActionType} from "./types";

export enum CART_ACTIONS {
    ADD_TO_CART = 'ADD_TO_CART',
}

type CartAction = ActionType<CART_ACTIONS>

export const addToCart = (product: Product): CartAction => {
    return {
        type: CART_ACTIONS.ADD_TO_CART,
        product: product
    }
};