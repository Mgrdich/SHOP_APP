import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {RootFavouriteStackParamList} from "./ProductsNavigator";

export type ProductsNavigatorProps<T> = NativeStackScreenProps<RootFavouriteStackParamList, T>;

export type ScreenNavigationProp<T> = ProductsNavigatorProps<T>['navigation'];

export type ScreenRouteProp<T> = ProductsNavigatorProps<T>['route'];