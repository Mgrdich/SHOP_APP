export enum DRAWERS {
    ProductsStack = 'ProductsStack',
    OrdersStack = 'OrdersStack',
    UsersStack='UsersStack'
}

export type RootDrawerParams = {
    [DRAWERS.ProductsStack]: undefined,
    [DRAWERS.OrdersStack]: undefined,
    [DRAWERS.UsersStack]: undefined
}