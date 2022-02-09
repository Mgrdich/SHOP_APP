import {Dictionary} from "../types";

type RequestType = 'GET' | 'POST' | 'PATCH' | 'DELETE';

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

    static isNull(element: any): boolean {
        return element === null;
    }

    static getAuthUrl(url: string, token?: string): string {
        return `${url}?auth=${token}`;
    }

    static async request<T = any>(
        type: RequestType, url: string,
        body?: Dictionary | null,
        headers?: Dictionary
    ): Promise<T> {
        headers = {
            'Content-Type': 'application/json',
            ...headers
        };

        let config: RequestInit = {
            method: type,
            headers: headers
        };

        if (type === 'POST' || type === 'PATCH') {
            config.body = JSON.stringify(body);
        }

        return fetch(url, config)
            .then(res => res.json())
            .then((res: T) => res);
    }

    static async post<T>(url: string, body: Dictionary, headers?: Dictionary): Promise<T> {
        return FunctionUtil.request<T>('POST', url, body, headers);
    }

    static async get<T>(url: string, headers?: Dictionary): Promise<T> {
        return FunctionUtil.request<T>('GET', url, null, headers);
    }

    static async patch<T>(url: string, body: Dictionary, headers?: Dictionary , isAuthQuery?:boolean): Promise<T> {
        return FunctionUtil.request<T>('PATCH', url, body, headers);
    }

    static async delete<T>(url: string, headers?: Dictionary): Promise<T> {
        return FunctionUtil.request<T>('DELETE', url, null, headers);
    }
}