import {ActionType, AppThunk} from "./types";
import FU from "../../util/FunctionUtil";
import CONFIGS from "../../configs";
import {Product} from "../../models/products";

export enum PRODUCTS_ACTIONS {
    DELETE_PRODUCT = 'DELETE_PRODUCT',
    CREATE_PRODUCT = 'CREATE_PRODUCT',
    EDIT_PRODUCT = 'EDIT_PRODUCT',
    SET_PRODUCTS = 'SET_PRODUCTS'
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
    return async (dispatch): Promise<void> => {
        try {
            const res = await FU.post<any>(CONFIGS.products_url, product);
            if (res) {
                dispatch({
                    type: PRODUCTS_ACTIONS.CREATE_PRODUCT,
                    productData: product
                });
            }
        } catch (err) {
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

export function fetchProducts(): AppThunk {
    return async (dispatch): Promise<any> => {
        try {
            const res = await FU.get<any>(CONFIGS.products_url);
            let products: Product[] = [];

            for (const resKey in res) {
                let item = res[resKey];
                products.push(
                    new Product(resKey, 'u1',
                        item.title,
                        item.imageUrl,
                        item.description,
                        item.price
                    )
                );
            }

            if (products.length) {
                return dispatch({
                    type: PRODUCTS_ACTIONS.SET_PRODUCTS,
                    products
                });
            }

        } catch (err) {
        }
    }
}