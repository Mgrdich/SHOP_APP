import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Util from "../util/Util";
import {StyleSheet} from "react-native";
import STYLING_COLORS from "../constants/StylingColors";

export enum PRODUCTS_STACK_SCREENS {
    ProductsOverview = 'ProductsOverview',
    MealDetail = 'MealDetail'
}

export type RootFavouriteStackParamList = {
    [PRODUCTS_STACK_SCREENS.ProductsOverview]: undefined,
    [PRODUCTS_STACK_SCREENS.MealDetail]: undefined
}

const Products = createNativeStackNavigator();


const ProductsNavigator: React.FC = () => {
    return (
        <Products.Navigator
            defaultScreenOptions={{
                headerStyle: Util.isAndroid ? styles.headerStyle : '',
                headerTintColor: Util.isAndroid ? 'white' : STYLING_COLORS.primary,

            }}
        >
            <Products.Screen name={PRODUCTS_STACK_SCREENS.ProductsOverview}
                             component={ProductOverviewScreen}
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