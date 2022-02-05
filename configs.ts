import {FIREBASE_URL} from "@env";

interface I_CONFIG {
    firebase_url: string,
    products_url: string,
    products_url_id: string
}

const CONFIGS: I_CONFIG = {
    firebase_url: FIREBASE_URL,
    products_url: '',
    products_url_id: ''
};

CONFIGS.products_url = `${CONFIGS.firebase_url}/products.json`;

CONFIGS.products_url_id = `${CONFIGS.firebase_url}/products/{{0}}.json`

export default CONFIGS;