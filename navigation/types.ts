import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootProductsStackParamList} from "./ProductsNavigator";

export type ProductsNavigatorProps<T> = NativeStackScreenProps<RootProductsStackParamList, T>;

export type ScreenNavigationProp<T> = ProductsNavigatorProps<T>['navigation'];

export type ScreenRouteProp<T> = ProductsNavigatorProps<T>['route'];