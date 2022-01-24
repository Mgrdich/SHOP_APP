export interface IProduct {
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
}

export class Product implements IProduct {

    id = ''
    ownerId = ''
    title = ''
    imageUrl = ''
    description = ''
    price = 0

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
        this.price = 0;
    }
}