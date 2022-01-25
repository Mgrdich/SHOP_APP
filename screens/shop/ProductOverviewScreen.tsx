import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, Text} from "react-native";
import {useAppSelector} from "../../hooks/redux";
import {Product} from "../../models/products";

interface ProductOverviewScreenProps {
}

const ProductOverviewScreen: React.FC<ProductOverviewScreenProps> = () => {

    const products: Product[] = useAppSelector(state => state.products.availableProducts);

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={(itemData:ListRenderItemInfo<Product>)=>(<Text>{itemData.item.title}</Text>)}
        />
    );
};

const styles = StyleSheet.create({});

export default ProductOverviewScreen;