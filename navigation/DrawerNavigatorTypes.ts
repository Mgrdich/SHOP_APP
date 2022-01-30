export enum DRAWERS {
    ProductsStack = 'ProductsStack',
    OrdersStack = 'OrdersStack'
}

export type RootDrawerParams = {
    [DRAWERS.ProductsStack]: undefined,
    [DRAWERS.OrdersStack]: undefined
}