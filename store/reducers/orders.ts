import {ORDERS_ACTIONS} from "../actions/orders";
import createReducer from "../reducers/helper";
import {ActionType} from "../actions/types";
import Order from "../../models/Order";

export interface IOrdersState {
    orders: Order[]
}

const initialState: IOrdersState = {
    orders: []
};

type orderActionType = ActionType<ORDERS_ACTIONS>

function addOrder(state: IOrdersState, action: orderActionType): IOrdersState {
    const newOrder: Order = new Order(action.orderDate.items, action.orderDate.amount, new Date());
    return {
        ...state,
        orders: state.orders.concat(newOrder)
    }
}

const ordersReducer = createReducer<IOrdersState, ORDERS_ACTIONS>(initialState, {
    [ORDERS_ACTIONS.ADD_ORDER]: addOrder
});

export default ordersReducer;
