import {Dictionary} from "../types";

export default class FunctionUtil {

    /**
     * @description Math.random should be unique because of its seeding algorithm.
     * Convert it to base 36 (numbers + letters), and grab the first {length} characters
     * after the decimal.
     * */
    static generateId(length: number = 9): string {
        return '_' + Math.random().toString(36).substr(2, length);
    }


    /**
     * @description to fixed to a 2 digit number
     * default to fixed 2 numbers
     * */
    static toFixedNumber(number: number, toFixedNumber: number = 2): number {
        return parseFloat(number.toFixed(toFixedNumber));
    }

    static isNumber(element: any): boolean {
        return typeof element === 'number';
    }

    static isString(element: any): boolean {
        return typeof element === 'string';
    }

    static isArray(element: any): boolean {
        return Array.isArray(element);
    }

    static isNaN(element: any): boolean {
        return isNaN(element);
    }

    static async request<T>(type: 'GET' | 'POST', url: string, body?: any, headers?:any): Promise<T> {
        headers = {
            'Content-Type': 'application/json',
            ...headers
        }

        let config: RequestInit = {
            method: type,
            headers: headers
        }

        if (type === 'POST') {
            config.body = body;
        }

        return fetch(url, config)
            .then(res => res.json())
            .then((res: T) => res);
    }

    static async post<T>(url: string, body: any, headers): Promise<T> {
        return FunctionUtil.request('POST', url, body, headers);
    }


    static async get<T>(url: string, headers): Promise<T> {
        return FunctionUtil.request('GET', url, null, headers);
    }
}