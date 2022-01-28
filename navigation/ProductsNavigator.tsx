import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Util from "../util/Util";
import STYLING_COLORS from "../constants/StylingColors";
import {StyleSheet} from "react-native";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import {PRODUCTS_STACK_SCREENS, RootProductsStackParamList} from "./ProductsNavigationTypes";
import {PROJECT_FONTS} from "../constants/Fonts";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const Products = createNativeStackNavigator<RootProductsStackParamList>();

const ProductsNavigator: React.FC = () => {
    return (
        <Products.Navigator
            screenOptions={{
                headerStyle: Util.isAndroid ? styles.headerStyle : {},
                headerTintColor: Util.isAndroid ? 'white' : STYLING_COLORS.primary,
                headerTitleStyle: {
                    fontFamily: PROJECT_FONTS.openSansBold
                },
                headerBackTitleStyle: {
                    fontFamily: PROJECT_FONTS.openSans
                },
            }}
        >
            <Products.Screen name={PRODUCTS_STACK_SCREENS.ProductsOverview}
                             component={ProductOverviewScreen}
                             options={({route}) => (
                                 {
                                     title: 'All Products',
                                     headerRight: () => (
                                         <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                             <Item
                                                 title="Cart"
                                                 iconName={Util.isAndroid ? 'md-cart' : 'ios-cart'}
                                                 onPress={() => {}}
                                             />
                                         </HeaderButtons>
                                     )
                                 }
                             )}
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