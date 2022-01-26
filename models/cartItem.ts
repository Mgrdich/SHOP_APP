import FunctionUtil from "../util/FunctionUtil";

export interface ICartItem {
    id?: string
    quantity: number,
    prodPrice: number,
    prodTitle: string,
    sum: number,
}

export class CartItem implements ICartItem {
    id = ''
    quantity = 0
    prodPrice = 0
    prodTitle = ''
    sum = 0

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