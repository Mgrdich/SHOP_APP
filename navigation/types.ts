import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootProductsStackParamList} from "./ProductsNavigationTypes";
import {RootOrdersStackParamList} from "./OrderNavigatorTypes";
import {RootUsersStackParamList} from "./UserNavigatorTypes";


export type ProductsNavigatorProps<T> = NativeStackScreenProps<RootProductsStackParamList, T>;

export type ProductsNavigatorNavigationProp<T> = ProductsNavigatorProps<T>['navigation'];

export type ProductsNavigatorProp<T> = ProductsNavigatorProps<T>['route'];


export type OrdersNavigatorProps<T> = NativeStackScreenProps<RootOrdersStackParamList, T>;

export type OrdersNavigatorNavigationProp<T> = OrdersNavigatorProps<T>['navigation'];

export type OrdersNavigatorProp<T> = OrdersNavigatorProps<T>['route'];


export type UsersNavigatorProps<T> = NativeStackScreenProps<RootUsersStackParamList, T>;

export type UsersNavigatorPropsNavigationProp<T> = UsersNavigatorProps<T>['navigation'];

export type UsersNavigatorProp<T> = ProductsNavigatorProps<T>['route'];
