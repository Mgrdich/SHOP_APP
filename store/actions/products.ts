import {ActionType} from "./types";

export enum PRODUCTS_ACTIONS {
    DELETE_PRODUCT = 'DELETE_PRODUCT'
}

type ProductActionType = ActionType<PRODUCTS_ACTIONS>

export function deleteProduct(id: string): ProductActionType {
    return {
        type: PRODUCTS_ACTIONS.DELETE_PRODUCT,
        pId:id
    }
}