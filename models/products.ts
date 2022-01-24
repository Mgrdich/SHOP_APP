interface IProducts {
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
}

class Products implements IProducts {

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