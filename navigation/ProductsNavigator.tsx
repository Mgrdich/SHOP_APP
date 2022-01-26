import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Util from "../util/Util";
import STYLING_COLORS from "../constants/StylingColors";
import {StyleSheet} from "react-native";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import {PRODUCTS_STACK_SCREENS, RootProductsStackParamList} from "./ProductsNavigationTypes";

const Products = createNativeStackNavigator<RootProductsStackParamList>();

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
                             options={{
                                 title: 'All Products'
                             }}
            />
            <Products.Screen name={PRODUCTS_STACK_SCREENS.ProductsDetail}
                             component={ProductDetailScreen}
                             options={({route}) => (
                                 {
                                     title: route.params.productTitle
                                 }
                             )}
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