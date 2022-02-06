import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ListRenderItemInfo, View, StyleSheet} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Product} from "../../models/products";
import {ProductsNavigatorProps} from "../../navigation/types";
import ProductItem from "../../components/shop/ProductItem";
import {PRODUCTS_STACK_SCREENS} from "../../navigation/ProductsNavigationTypes";
import {addToCart} from "../../store/actions/cart";
import StyledButton from "../../components/Styled/StyledButton";
import {fetchProducts} from "../../store/actions/products";
import StylingColors from "../../constants/StylingColors";
import NoDataFound from "../../components/UI/NoDateFound";
import useLoading from "../../hooks/useLoading";
import StyledText from "../../components/Styled/StyledText";
import {useFocusEffect} from "@react-navigation/native";

type ProductsProps = ProductsNavigatorProps<PRODUCTS_STACK_SCREENS.ProductsOverview>;

const ProductOverviewScreen: React.FC<ProductsProps> = ({navigation, route}) => {
    const {isLoading, setLoading, isError, setError} = useLoading();
    const products: Product[] = useAppSelector(state => state.products.availableProducts);
    const dispatch = useAppDispatch();

    const loadProducts = useCallback(async function (){
        setLoading(true);
        dispatch(fetchProducts())
            .then(function () {
                setLoading(false);
            }).catch(function (err) {
            setError(err.toString());
        });
    },[dispatch]);

    useEffect(function () {
        loadProducts()
            .then();
    }, [loadProducts]);

    useFocusEffect(useCallback(function () {
        loadProducts()
            .then();
    },[loadProducts]));

    const redirectToProductDetails = (id: string, title: string) => {
        navigation.navigate(
            PRODUCTS_STACK_SCREENS.ProductsDetail as any, {
                productId: id,
                productTitle: title
            } as any
        );
    };

    if (isError) {
        return (
            <View style={styles.screen}>
                <StyledText bold>Something went Wrong</StyledText>
                <StyledButton style={styles.btn} primary title="Try again" onPress={loadProducts}/>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.screen}>
                <ActivityIndicator size="large" color={StylingColors.primary}/>
            </View>
        )
    }

    if (!isLoading && !products.length) {
        return (
            <NoDataFound text="No products Found"/>
        )
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={(itemData: ListRenderItemInfo<Product>) =>
                (<ProductItem title={itemData.item.title}
                              imgSrc={itemData.item.imageUrl}
                              price={itemData.item.price}
                              onSelect={() => redirectToProductDetails(itemData.item.id, itemData.item.title)}
                    >
                        <StyledButton primary
                                      title="View Details"
                                      onPress={() => redirectToProductDetails(itemData.item.id, itemData.item.title)}
                        />
                        <StyledButton primary
                                      title="To Cart"
                                      onPress={() => dispatch(addToCart(itemData.item))}
                        />
                    </ProductItem>
                )
            }
        />
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    btn: {
        marginTop: 10
    }
})

export default ProductOverviewScreen;