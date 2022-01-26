class FunctionUtil {

    /**
     * @description Math.random should be unique because of its seeding algorithm.
     * Convert it to base 36 (numbers + letters), and grab the first {length} characters
     * after the decimal.
     * */
    static generateId(length: number = 9): string {
        return '_' + Math.random().toString(36).substr(2, length);
    }
}