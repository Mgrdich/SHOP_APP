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
    items = []
    totalAmount = 0
    date = new Date()
    readableDate = ''

    constructor(items: CartItem[], totalAmount: number, date: Date) {
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
        this.readableDate = this.date.toString()
    }

}

export default Order;