import {ActionType} from "./types";
import {ICartItemsElement} from "../../models/cartItem";
import FU from "../../util/FunctionUtil";
import CONFIGS from "../../configs";
import Order from "../../models/Order";
import {IAuthState} from "../reducers/auth";

export enum ORDERS_ACTIONS {
    ADD_ORDER = 'ADD_ORDER',
    SET_ORDERS= 'SET_ORDERS'
}

type OrdersAction = ActionType<ORDERS_ACTIONS>;


export const addOrder = (cartItems: ICartItemsElement[], totalAmount: number) => {
    return async (dispatch, getState) => {

        const orderData =  {
            items: cartItems,
            amount: totalAmount,
            date: new Date().toISOString()
        };

        let auth = getState().auth;
        try {
            let url:string =  FU.getAuthUrl(
                CONFIGS.orders_url.replace('{{uid}}', auth.userId),
                auth.token
            );
            const res = await FU.post<any>(url, orderData);

            if (res?.error) {
                return Promise.reject(res.error);
            }

            if (res) {
                return dispatch({
                    type: ORDERS_ACTIONS.ADD_ORDER,
                    orderData: orderData
                });
            }
        } catch (err) {
            throw Error('Something went Wrong');
        }

    }
}


export const fetchOrders  = () => {
    return async (dispatch, getState) => {
        try {
            let auth: IAuthState = getState().auth;
            let url: string = FU.getAuthUrl(
                CONFIGS.orders_url.replace('{{uid}}', auth.userId),
                auth.token
            );
            const res = await FU.get(url);

            if (res?.error) {
                return Promise.reject(res.error);
            }

            let orderData = [];

            for (const resKey in res) {
                let item = res[resKey];
                orderData.push(
                    new Order(item.items, item.amount, new Date(item.date))
                );
            }

            return dispatch({
                type: ORDERS_ACTIONS.SET_ORDERS,
                orderData: orderData
            });

        } catch (err) {
            throw Error('Something went Wrong');
        }
    }
}


