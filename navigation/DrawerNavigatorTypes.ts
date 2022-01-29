export enum DRAWERS {
    Products = 'Products',
    Orders = 'Orders'
}

export type RootDrawerParams = {
    [DRAWERS.Products]: undefined,
    [DRAWERS.Orders]: undefined
}