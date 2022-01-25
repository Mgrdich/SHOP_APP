import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Util from "../util/Util";
import {StyleSheet} from "react-native";
import STYLING_COLORS from "../constants/StylingColors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";

export enum PRODUCTS_STACK_SCREENS {
    ProductsOverview = 'ProductsOverview',
    ProductsDetail = 'ProductsDetail',
}

export type RootFavouriteStackParamList = {
    [PRODUCTS_STACK_SCREENS.ProductsOverview]: undefined;
    [PRODUCTS_STACK_SCREENS.ProductsDetail]: undefined;
}

const Products = createNativeStackNavigator<RootFavouriteStackParamList>();


const ProductsNavigator: React.FC = () => {
    return (
        <Products.Navigator
            defaultScreenOptions = {{
                headerStyle: Util.isAndroid ? styles.headerStyle : '',
                headerTintColor: Util.isAndroid ? 'white' : STYLING_COLORS.primary,
            }}
        >
            <Products.Screen name={PRODUCTS_STACK_SCREENS.ProductsOverview}
                             component={ProductOverviewScreen}
                             options = {{
                                 title:'All Products'
                             }}
            />
            <Products.Screen name={PRODUCTS_STACK_SCREENS.ProductsDetail}
                             component={ProductDetailScreen}
                             options = {{
                                 title:'Product Detail'
                             }}
            />
        </Products.Navigator>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: STYLING_COLORS.primary
    }
});

export default ProductsNavigator;