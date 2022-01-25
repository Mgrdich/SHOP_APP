import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, Text} from "react-native";
import {useAppSelector} from "../../hooks/redux";
import {Product} from "../../models/products";
import {ProductsNavigatorProps} from "../../navigation/types";
import {PRODUCTS_STACK_SCREENS} from "../../navigation/ProductsNavigator";
import ProductItem from "../../components/shop/ProductItem";

type ProductsProps = ProductsNavigatorProps<PRODUCTS_STACK_SCREENS.ProductsOverview>;

const ProductOverviewScreen: React.FC<ProductsProps> = ({navigation, route}) => {

    const products: Product[] = useAppSelector(state => state.products.availableProducts);

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={(itemData: ListRenderItemInfo<Product>) =>
                (<ProductItem title={itemData.item.title}
                              imgSrc={itemData.item.imageUrl}
                              price={itemData.item.price}
                              onViewDetailPress={() => navigation.navigate(
                                  PRODUCTS_STACK_SCREENS.ProductsDetail as any, {
                                      productId: itemData.item.id
                                  } as any
                              )}
                              onCartPress={() => {}}
                    />
                )
            }
        />
    );
};

const styles = StyleSheet.create({});

export default ProductOverviewScreen;