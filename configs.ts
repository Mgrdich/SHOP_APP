import {Dictionary} from "./types";
import {FIREBASE_URL} from "@env";

const CONFIGS: Dictionary<string> = {
    firebase_url: FIREBASE_URL,
    products_url: '',
};

CONFIGS.products_url = `${CONFIGS.firebase_url}/products.json`;

export default CONFIGS;