import {CartItem, ICartItemsElement} from "./cartItem";
import FunctionUtil from "../util/FunctionUtil";

interface IOrder {
    id: string,
    items: ICartItemsElement[],
    totalAmount: number,
    date: Date
    readableDate: string
}

class Order implements IOrder {
    id = FunctionUtil.generateId()
    items: ICartItemsElement[];
    totalAmount: number;
    date = new Date()
    readableDate: string;

    constructor(items: ICartItemsElement[], totalAmount: number, date: Date) {
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
        this.readableDate = this.date.toLocaleDateString()
    }

}

export default Order;