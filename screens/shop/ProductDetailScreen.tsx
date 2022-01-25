import React from 'react';
import {StyleSheet, View} from "react-native";
import {ProductsNavigatorProps} from "../../navigation/types";
import {PRODUCTS_STACK_SCREENS} from "../../navigation/ProductsNavigator";
import {useAppSelector} from "../../hooks/redux";
import {Product} from "../../models/products";
import StyledText from "../../components/Styled/StyledText";

type ProductDetailScreenProps = ProductsNavigatorProps<PRODUCTS_STACK_SCREENS.ProductsDetail>;

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({navigation, route}) => {
    const prodId: string = route.params.productId;
    const product: Product | undefined = useAppSelector(state => {
        return state.products.availableProducts.find(prod => prod.id === prodId);
    });

    return (
        <View>
            <StyledText>{product?.title}</StyledText>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;