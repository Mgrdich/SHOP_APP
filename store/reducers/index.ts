import {combineReducers} from "redux";
import productsReducer, {IProductsState} from "./products";
import cartReducer, {ICartState} from "./cart";
import ordersReducer, {IOrdersState} from "./orders";
import authReducer, {IAuthState} from "./auth";


export interface IState {
    products: IProductsState,
    cart: ICartState,
    orders: IOrdersState,
    auth: IAuthState
}

const rootReducer = combineReducers<IState>({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    auth: authReducer
});

export default rootReducer;