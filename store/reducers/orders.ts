import {ORDERS_ACTIONS} from "../actions/orders";
import createReducer from "../reducers/helper";
import {ActionType} from "../actions/types";

export interface IOrdersState {
    orders: string[]
}

const initialState: IOrdersState = {
    orders: []
};

type orderActionType = ActionType<ORDERS_ACTIONS>

function addOrder(state: IOrdersState, action: orderActionType): IOrdersState {
    return state;
}

const ordersReducer = createReducer<IOrdersState, ORDERS_ACTIONS>(initialState, {
    [ORDERS_ACTIONS.ADD_ORDER]: addOrder
});

export default ordersReducer;
