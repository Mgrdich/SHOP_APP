import FunctionUtil from "../util/FunctionUtil";

export interface ICartItem {
    id?: string
    quantity: number,
    prodPrice: number,
    prodTitle: string,
    sum: number,
}

export interface ICartItemsElement extends ICartItem {
    productId: string
}

export class CartItem implements ICartItem {
    id: string;
    quantity: number;
    prodPrice: number;
    prodTitle: string;
    sum: number;

    constructor({
                    quantity,
                    prodPrice,
                    prodTitle,
                    sum
                }: ICartItem
    ) {
        this.id = FunctionUtil.generateId()
        this.quantity = quantity;
        this.prodPrice = prodPrice;
        this.prodTitle = prodTitle;
        this.sum = sum;
    }
}