import React from 'react';
import {Image, ScrollView, StyleSheet} from "react-native";
import {ProductsNavigatorProps} from "../../navigation/types";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Product} from "../../models/products";
import StyledText from "../../components/Styled/StyledText";
import StyledButton from "../../components/Styled/StyledButton";
import StylingColors from "../../constants/StylingColors";
import {PRODUCTS_STACK_SCREENS} from "../../navigation/ProductsNavigationTypes";
import {addToCart} from "../../store/actions/cart";

type ProductDetailScreenProps = ProductsNavigatorProps<PRODUCTS_STACK_SCREENS.ProductsDetail>;

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({route}) => {
    const prodId: string = route.params.productId;
    const product: Product | undefined = useAppSelector(state => {
        return state.products.availableProducts.find(prod => prod.id === prodId);
    });

    const dispatch = useAppDispatch();

    if (!product) {
        return <Text>Something went wrong</Text>
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: product.imageUrl}}/>
            <StyledButton title="Add to Cart"
                          primary
                          onPress={() => {dispatch(addToCart(product as Product))}}
                          style = {styles.action}

            />
            <StyledText style={styles.price}>${product.price?.toFixed()}</StyledText>
            <StyledText style={styles.description}>{product.description}</StyledText>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: StylingColors.grayText,
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
    action: {
        marginVertical: 10,
        alignItems: 'center'
    }
});

export default ProductDetailScreen;