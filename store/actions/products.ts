import {Product} from "../../models/products";

interface IProductsState {
    availableProducts: Product[]
    userProducts: Product[]
}

const initialState: IProductsState = {
    availableProducts: [],
    userProducts: []
};

export default function productReducer(state: IProductsState, action): IProductsState {
    return state
}