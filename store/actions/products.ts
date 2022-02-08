import {ActionType} from "./types";
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

export function deleteProduct(id: string) {
    return async (dispatch, getState) => {
        try {
            let url: string = FU.getAuthUrl(
                `${CONFIGS.products_url_id.replace('{{id}}', id)}`,
                getState().auth.token
            );
            const res = await FU.delete(url);

            if (FU.isNull(res)) {
                return dispatch({
                    type: PRODUCTS_ACTIONS.DELETE_PRODUCT,
                    pId: id
                });
            }

            if (res && res.error) {
                return Promise.reject(res.error);
            }

        } catch (err) {
            throw Error('Something went Wrong');
        }

    }
}

export function createProduct(product: productDataType) {
    return async (dispatch, getState) => {
        try {
            let url:string =  FU.getAuthUrl(CONFIGS.products_url, getState().auth.token);
            const res = await FU.post<any>(url, product);

            if (res.error) {
                return Promise.reject(res.error);
            }

            if (res) {
                return dispatch({
                    type: PRODUCTS_ACTIONS.CREATE_PRODUCT,
                    productData: product
                });
            }
        } catch (err) {
            throw Error('Something went Wrong');
        }
    }
}

export function editProduct(id: string, product: productDataType) {
    return async (dispatch, getState) => {
        try {
            let url: string = FU.getAuthUrl(
                CONFIGS.products_url_id.replace('{{id}}', id),
                getState().auth.token
            );
            const res = await FU.patch(url, product);

            if (res.error) {
                return Promise.reject(res.error);
            }

            if (res) {
                return dispatch({
                    type: PRODUCTS_ACTIONS.EDIT_PRODUCT,
                    pId: id,
                    productData: product
                });
            }
        } catch (err) {
            throw Error('Something Went Wrong');
        }
    }
}

export function fetchProducts() {
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
            throw Error('Something went wrong');
        }
    }
}