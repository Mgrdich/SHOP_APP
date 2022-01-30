import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootProductsStackParamList} from "./ProductsNavigationTypes";
import {RootOrdersStackParamList} from "./OrderNavigatorTypes";


export type ProductsNavigatorProps<T> = NativeStackScreenProps<RootProductsStackParamList, T>;

export type ProductsNavigatorNavigationProp<T> = ProductsNavigatorProps<T>['navigation'];

export type ProductsNavigatorProp<T> = ProductsNavigatorProps<T>['route'];


export type OrdersNavigatorProps<T> = NativeStackScreenProps<RootOrdersStackParamList, T>;

export type OrdersNavigatorNavigationProp<T> = ProductsNavigatorProps<T>['navigation'];

export type OrdersNavigatorProp<T> = ProductsNavigatorProps<T>['route'];
