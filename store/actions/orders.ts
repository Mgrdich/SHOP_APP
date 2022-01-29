import {ActionType} from "./types";
import {CartItem} from "../../models/cartItem";

export enum ORDERS_ACTIONS {
    ADD_ORDER = 'ADD_ORDER'
}

type OrdersAction = ActionType<ORDERS_ACTIONS>;


export const addOrder = (cartItems: CartItem[], totalAmount: number): OrdersAction => {
    return {
        type: ORDERS_ACTIONS.ADD_ORDER,
        orderData: {
            items: cartItems,
            amount: totalAmount
        }
    }
}


