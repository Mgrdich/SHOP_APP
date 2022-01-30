export interface IProduct {
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
}

export class Product implements IProduct {

    id: string;
    ownerId: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;

    constructor(id: string,
                ownerId: string,
                title: string,
                imageUrl: string,
                description: string,
                price: number
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}