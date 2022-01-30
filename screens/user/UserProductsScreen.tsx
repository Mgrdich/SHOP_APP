import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import ProductItem from "../../components/shop/ProductItem";
import {Product} from "../../models/products";
import StyledButton from "../../components/Styled/StyledButton";
import {deleteProduct} from "../../store/actions/products";
import {USERS_STACK_SCREENS} from "../../navigation/UserNavigatorTypes";
import {UsersNavigatorProps} from "../../navigation/types";


type UserProductsScreenTypeProps = UsersNavigatorProps<USERS_STACK_SCREENS.USERS>;

const UserProductsScreen: React.FC<UserProductsScreenTypeProps> = () => {
    const userProduct = useAppSelector(state => state.products.userProducts);
    const dispatch = useAppDispatch();

    return (
        <FlatList
            data={userProduct}
            keyExtractor={item=>item.id}
            renderItem={(item: ListRenderItemInfo<Product>)=>(
                <ProductItem title={item.item.title}
                             imgSrc={item.item.imageUrl}
                             price={item.item.price}
                             onSelect={()=>{}}
                >
                    <StyledButton primary title="Edit" onPress={()=>{}}/>
                    <StyledButton primary title="Delete" onPress={()=>dispatch(deleteProduct(item.item.id))}/>
                </ProductItem>
            )}
        />
    );
};

const styles = StyleSheet.create({});

export default UserProductsScreen;