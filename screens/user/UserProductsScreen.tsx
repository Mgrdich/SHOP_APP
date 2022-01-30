import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from "react-native";
import {useAppSelector} from "../../hooks/redux";
import ProductItem from "../../components/shop/ProductItem";
import {Product} from "../../models/products";

interface UserProductsScreenProps {

}

const UserProductsScreen: React.FC<UserProductsScreenProps> = () => {
    const userProduct = useAppSelector(state => state.products.userProducts);

    return (
        <FlatList
            data={userProduct}
            keyExtractor={item=>item.id}
            renderItem={(item: ListRenderItemInfo<Product>)=>(
                <ProductItem title={item.item.title}
                             imgSrc={item.item.imageUrl}
                             price={item.item.price}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({});

export default UserProductsScreen;