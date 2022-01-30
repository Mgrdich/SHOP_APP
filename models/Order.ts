import {ICartItemsElement} from "./cartItem";
import FunctionUtil from "../util/FunctionUtil";

interface IOrder {
    id: string,
    items: ICartItemsElement[],
    totalAmount: number,
    date: Date
    readableDate: string
}

class Order implements IOrder {
    id: string;
    items: ICartItemsElement[];
    totalAmount: number;
    date = new Date();
    readableDate: string;

    constructor(items: ICartItemsElement[], totalAmount: number, date: Date) {
        this.id = FunctionUtil.generateId();
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
        this.readableDate = this.date.toLocaleDateString('en-EN', {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute:"2-digit"
        });
    }

}

export default Order;