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
}