import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Util from "../util/Util";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import {PRODUCTS_STACK_SCREENS, RootProductsStackParamList} from "./ProductsNavigationTypes";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";
import {screenDefaultOptions} from "./options";

const Products = createNativeStackNavigator<RootProductsStackParamList>();

const ProductsNavigator: React.FC = () => {
    return (
        <Products.Navigator
            screenOptions={screenDefaultOptions}
        >
            <Products.Screen name={PRODUCTS_STACK_SCREENS.ProductsOverview}
                             component={ProductOverviewScreen}
                             options={({route , navigation}) => (
                                 {
                                     title: 'All Products',
                                     headerRight: () => (
                                         <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                             <Item
                                                 title="Cart"
                                                 iconName={Util.isAndroid ? 'md-cart' : 'ios-cart'}
                                                 onPress={() => {
                                                     navigation.navigate(PRODUCTS_STACK_SCREENS.CartScreen)
                                                 }}
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

            <Products.Screen name={PRODUCTS_STACK_SCREENS.CartScreen}
                             component={CartScreen}
                             options={{
                                 title: "Cart"
                             }}
            />
        </Products.Navigator>
    );
};



export default ProductsNavigator;