export enum PRODUCTS_STACK_SCREENS {
    ProductsOverview = 'ProductsOverview',
    ProductsDetail = 'ProductsDetail',
    CartScreen = 'CartScreen'
}

export type RootProductsStackParamList = {
    [PRODUCTS_STACK_SCREENS.ProductsOverview]: undefined;
    [PRODUCTS_STACK_SCREENS.ProductsDetail]: {
        productId: string,
        productTitle: string
    };
    [PRODUCTS_STACK_SCREENS.CartScreen]: undefined
}
