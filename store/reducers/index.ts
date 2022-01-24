import {combineReducers, createStore} from "redux";
import productsReducer from "./actions/products";
import {IProductsState} from "./products";


export interface IState {
    products: IProductsState
}


const rootReducer = combineReducers({
    products: productsReducer
});

export default rootReducer;