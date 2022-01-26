import {combineReducers} from "redux";
import productsReducer, {IProductsState} from "./products";
import cartReducer, {ICartState} from "./cart";


export interface IState {
    products: IProductsState,
    cart: ICartState
}

const rootReducer = combineReducers<IState>({
    products: productsReducer,
    cart: cartReducer
});

export default rootReducer;