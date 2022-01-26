import {Product} from "../../models/products";
import {DUMMY_PRODUCTS} from "../../data/dummy-data";
import {CART_ACTIONS} from "../actions/cart";

export interface IProductsState {
    availableProducts: Product[]
    userProducts: Product[]
}

const initialState: IProductsState = {
    availableProducts: DUMMY_PRODUCTS,
    userProducts: DUMMY_PRODUCTS.filter(p => p.ownerId === 'u1')
};

type productActionType = {
    type: CART_ACTIONS | undefined
}

export default function productsReducer(state: IProductsState = initialState, action: productActionType): IProductsState {
    return state
}