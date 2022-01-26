import {Product} from "../../models/products";
import {DUMMY_PRODUCTS} from "../../data/dummy-data";
import {PRODUCTS_ACTIONS} from "../actions/products";
import createReducer from "./helper";

export interface IProductsState {
    availableProducts: Product[]
    userProducts: Product[]
}

const initialState: IProductsState = {
    availableProducts: DUMMY_PRODUCTS,
    userProducts: DUMMY_PRODUCTS.filter(p => p.ownerId === 'u1')
};

type productActionType = {
    type: PRODUCTS_ACTIONS | undefined
}

const productsReducer = createReducer<IProductsState,PRODUCTS_ACTIONS>(initialState , {
    // [PRODUCTS_ACTIONS]
});

export default productsReducer;