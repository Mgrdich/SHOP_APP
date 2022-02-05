import {Product} from "../../models/products";
import {DUMMY_PRODUCTS} from "../../data/dummy-data";
import {productDataType, PRODUCTS_ACTIONS} from "../actions/products";
import createReducer from "./helper";
import {ActionType} from "../actions/types";
import FunctionUtil from "../../util/FunctionUtil";

export interface IProductsState {
    availableProducts: Product[]
    userProducts: Product[]
}

const initialState: IProductsState = {
    availableProducts: [],
    userProducts: []
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
    const productData: productDataType = action.productData;

    const newProduct: Product = new Product(
        FunctionUtil.generateId(),
        'u1',
        productData.title,
        productData.imageUrl,
        productData.description,
        productData.price
    );

    return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
    };
}

function editProduct(state: IProductsState, action: productActionType): IProductsState {
    const productIndex: number = state.userProducts.findIndex(prod => prod.id === action.pId);
    const productData: productDataType = action.productData;

    const updatedProduct = new Product(
        action.pId,
        state.userProducts[productIndex].ownerId,
        productData.title,
        productData.imageUrl,
        productData.description,
        productData.price
    );

    const updatedUserProducts:Product[] = [...state.userProducts];
    updatedUserProducts[productIndex] = updatedProduct;

    const availableProductIndex:number = state.availableProducts.findIndex(prod => prod.id === action.pId);
    const availableProducts:Product[] = [...state.availableProducts];
    updatedUserProducts[availableProductIndex] = updatedProduct;

    return {
        ...state,
        userProducts:updatedUserProducts,
        availableProducts: availableProducts
    };
}

function setProducts(state: IProductsState, action: productActionType): IProductsState {
    return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products
    };
}

const productsReducer = createReducer<IProductsState, PRODUCTS_ACTIONS>(initialState, {
    [PRODUCTS_ACTIONS.DELETE_PRODUCT]: deleteProduct,
    [PRODUCTS_ACTIONS.EDIT_PRODUCT]: editProduct,
    [PRODUCTS_ACTIONS.CREATE_PRODUCT]: createProduct,
    [PRODUCTS_ACTIONS.SET_PRODUCTS]: setProducts
});

export default productsReducer;