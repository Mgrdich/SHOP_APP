import {ActionType, AppThunk} from "./types";
import FU from "../../util/FunctionUtil";
import CONFIGS from "../../configs";

export enum PRODUCTS_ACTIONS {
    DELETE_PRODUCT = 'DELETE_PRODUCT',
    CREATE_PRODUCT = 'CREATE_PRODUCT',
    EDIT_PRODUCT = 'EDIT_PRODUCT'
}

type ProductActionType = ActionType<PRODUCTS_ACTIONS>

export type productDataType = { title: string, description: string, imageUrl: string, price: number };

export function deleteProduct(id: string): ProductActionType {
    return {
        type: PRODUCTS_ACTIONS.DELETE_PRODUCT,
        pId: id
    }
}

export function createProduct(product: productDataType): AppThunk {
    return async (dispatch) => {
        try {
            const res = await FU.post<any>(CONFIGS.products_url, product);
            if(res) {
                dispatch({
                    type: PRODUCTS_ACTIONS.CREATE_PRODUCT,
                    productData: product
                });
            }
        } catch (err) {}
    }
}

export function editProduct(id: string, product: productDataType): ProductActionType {
    return {
        type: PRODUCTS_ACTIONS.EDIT_PRODUCT,
        pId: id,
        productData: {
            title: product.title,
            description: product.description,
            imageUrl: product.imageUrl,
            price: product.price
        }
    }
}