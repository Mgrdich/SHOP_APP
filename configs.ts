import {Dictionary} from "./types";
import Config from "react-native-config";

const CONFIGS: Dictionary<string> = {
    firebase_url: Config.FIREBASE_URL,
    products_url: '',
};

CONFIGS.products_url = `${CONFIGS.firebase_url}/products.json}`;

export default CONFIGS;