import {FIREBASE_URL} from "@env";

interface I_CONFIG {
    firebase_url: string,
    products_url: string,
    products_url_id: string,
    orders_url: string,
    orders_url_id:string
}

const CONFIGS: I_CONFIG = {
    firebase_url: FIREBASE_URL,
    products_url: '',
    products_url_id: '',
    orders_url: '',
    orders_url_id: ''
};

CONFIGS.products_url = `${CONFIGS.firebase_url}/products.json`;

CONFIGS.products_url_id = `${CONFIGS.firebase_url}/products/{{id}}.json`

CONFIGS.orders_url = `${CONFIGS.firebase_url}/orders.json`

CONFIGS.orders_url_id = `${CONFIGS.firebase_url}/orders/{{id}}.json`

export default CONFIGS;