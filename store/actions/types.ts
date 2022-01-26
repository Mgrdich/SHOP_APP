export interface ActionFunction<T> {
    type: T,

    [key: string]: any
}