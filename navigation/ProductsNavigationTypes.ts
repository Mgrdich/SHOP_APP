export enum PRODUCTS_STACK_SCREENS {
    ProductsOverview = 'ProductsOverview',
    ProductsDetail = 'ProductsDetail',
}

export type RootProductsStackParamList = {
    [PRODUCTS_STACK_SCREENS.ProductsOverview]: undefined;
    [PRODUCTS_STACK_SCREENS.ProductsDetail]: {
        productId: string,
        productTitle: string
    }
}
