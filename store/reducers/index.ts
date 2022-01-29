import {combineReducers} from "redux";
import productsReducer, {IProductsState} from "./products";
import cartReducer, {ICartState} from "./cart";
import ordersReducer, {IOrdersState} from "./orders";


export interface IState {
    products: IProductsState,
    cart: ICartState,
    orders: IOrdersState
}

const rootReducer = combineReducers<IState>({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
});

export default rootReducer;