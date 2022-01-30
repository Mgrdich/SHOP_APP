import {Product} from "../../models/products";
import {DUMMY_PRODUCTS} from "../../data/dummy-data";
import {PRODUCTS_ACTIONS} from "../actions/products";
import createReducer from "./helper";
import {ActionType} from "../actions/types";

export interface IProductsState {
    availableProducts: Product[]
    userProducts: Product[]
}

const initialState: IProductsState = {
    availableProducts: DUMMY_PRODUCTS,
    userProducts: DUMMY_PRODUCTS.filter(p => p.ownerId === 'u1')
};

type productActionType = ActionType<PRODUCTS_ACTIONS>

function deleteProduct(state: IProductsState, action: productActionType): IProductsState {
    return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.pId),
        availableProducts: state.availableProducts.filter(product => product.id !== action.pId)
    }
}

function createProduct(state: IProductsState, action: productActionType): IProductsState {
    return state;
}

function editProduct(state: IProductsState, action: productActionType): IProductsState {
    return state;
}

const productsReducer = createReducer<IProductsState, PRODUCTS_ACTIONS>(initialState, {
    [PRODUCTS_ACTIONS.DELETE_PRODUCT]: deleteProduct,
    [PRODUCTS_ACTIONS.EDIT_PRODUCT]: editProduct,
    [PRODUCTS_ACTIONS.CREATE_PRODUCT]: createProduct
});

export default productsReducer;