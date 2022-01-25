import React from 'react';
import {StyleSheet} from "react-native";
import {ProductsNavigatorProps} from "../../navigation/types";
import {PRODUCTS_STACK_SCREENS} from "../../navigation/ProductsNavigator";

type ProductDetailScreenProps = ProductsNavigatorProps<PRODUCTS_STACK_SCREENS.ProductsDetail>;

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = () => {
    return (
        <>
        </>
    );
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;