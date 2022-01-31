import {ActionType} from "./types";

export enum PRODUCTS_ACTIONS {
    DELETE_PRODUCT = 'DELETE_PRODUCT',
    CREATE_PRODUCT = 'CREATE_PRODUCT',
    EDIT_PRODUCT = 'EDIT_PRODUCT'
}

type ProductActionType = ActionType<PRODUCTS_ACTIONS>

export function deleteProduct(id: string): ProductActionType {
    return {
        type: PRODUCTS_ACTIONS.DELETE_PRODUCT,
        pId: id
    }
}


export type productDataType = { title: string, description: string, imageUrl: string, price: number };

export function createProduct(product: productDataType): ProductActionType {
    return {
        type: PRODUCTS_ACTIONS.CREATE_PRODUCT,
        productData: {
            title: product.title,
            description: product.description,
            imageUrl: product.imageUrl,
            price: product.price
        }
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