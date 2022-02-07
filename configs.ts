import {FIREBASE_URL, API_KEY} from "@env";

interface I_CONFIG {
    firebase_url: string,
    api_key: string,
    products_url: string,
    products_url_id: string,
    orders_url: string,
    orders_url_id: string,
    auth_signup_url: string,
    auth_signin_url: string
}

const CONFIGS: I_CONFIG = {
    firebase_url: FIREBASE_URL,
    api_key: API_KEY,
    products_url: '',
    products_url_id: '',
    orders_url: '',
    orders_url_id: '',
    auth_signup_url: '',
    auth_signin_url:''
};

CONFIGS.auth_signup_url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${CONFIGS.api_key}`;

CONFIGS.auth_signin_url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${CONFIGS.api_key}`

CONFIGS.products_url = `${CONFIGS.firebase_url}/products.json`;

CONFIGS.products_url_id = `${CONFIGS.firebase_url}/products/{{id}}.json`

CONFIGS.orders_url = `${CONFIGS.firebase_url}/orders/u1.json`

CONFIGS.orders_url_id = `${CONFIGS.firebase_url}/orders/u1/{{id}}.json`

export default CONFIGS;