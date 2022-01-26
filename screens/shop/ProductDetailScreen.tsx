import React from 'react';
import {Image, ScrollView, StyleSheet} from "react-native";
import {ProductsNavigatorProps} from "../../navigation/types";
import {useAppSelector} from "../../hooks/redux";
import {Product} from "../../models/products";
import StyledText from "../../components/Styled/StyledText";
import StyledButton from "../../components/Styled/StyledButton";
import StylingColors from "../../constants/StylingColors";
import {PRODUCTS_STACK_SCREENS} from "../../navigation/ProductsNavigationTypes";

type ProductDetailScreenProps = ProductsNavigatorProps<PRODUCTS_STACK_SCREENS.ProductsDetail>;

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({navigation, route}) => {
    const prodId: string = route.params.productId;
    const product: Product | undefined = useAppSelector(state => {
        return state.products.availableProducts.find(prod => prod.id === prodId);
    });

    if (!product) {
        return <Text>Something went wrong</Text>
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: product.imageUrl}}/>
            <StyledButton title="Add to Cart"
                          primary
                          onPress={() => {}}
            />
            <StyledText style={styles.price}>${product.price.toFixed()}</StyledText>
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
        textAlign: 'center'
    }
});

export default ProductDetailScreen;