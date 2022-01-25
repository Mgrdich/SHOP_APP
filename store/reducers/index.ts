import {combineReducers, createStore} from "redux";
import productsReducer, {IProductsState} from "./products";


export interface IState {
    products: IProductsState
}

const rootReducer = combineReducers<IState>({
    products: productsReducer
});

export default rootReducer;