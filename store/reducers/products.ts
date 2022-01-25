import {Product} from "../../models/products";
import {DUMMY_PRODUCTS} from "../../data/dummy-data";

export interface IProductsState {
    availableProducts: Product[]
    userProducts: Product[]
}

const initialState: IProductsState = {
    availableProducts: DUMMY_PRODUCTS,
    userProducts: DUMMY_PRODUCTS.filter(p => p.ownerId === 'u1')
};

export default function productsReducer(state: IProductsState = initialState, action): IProductsState {
    return state
}