import React from 'react';
import {Alert, FlatList, ListRenderItemInfo, StyleSheet} from "react-native";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import ProductItem from "../../components/shop/ProductItem";
import {Product} from "../../models/products";
import StyledButton from "../../components/Styled/StyledButton";
import {deleteProduct} from "../../store/actions/products";
import {USERS_STACK_SCREENS} from "../../navigation/UserNavigatorTypes";
import {UsersNavigatorProps} from "../../navigation/types";
import useLoading from "../../hooks/useLoading";
import PageLoading from "../../components/UI/PageLoading";


type UserProductsScreenTypeProps = UsersNavigatorProps<USERS_STACK_SCREENS.USERS>;

const UserProductsScreen: React.FC<UserProductsScreenTypeProps> = ({navigation}) => {
    const {isLoading, setLoading, setError} = useLoading();
    const userProduct = useAppSelector(state => state.products.userProducts);
    const dispatch = useAppDispatch();

    const onEditRedirect = (id: string) => {
        navigation.navigate(USERS_STACK_SCREENS.EDIT_USER as any, {
            prodId: id
        } as any);
    };

    const deleteHandler = (id: string) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: 'default'},
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    setLoading(true);
                    dispatch(deleteProduct(id))
                        .then(function () {
                            setLoading(false);
                        })
                        .catch(function () {
                            setError();
                        });
                }
            }
        ]);
    };

    if (isLoading) {
        return <PageLoading/>;
    }

    return (
        <FlatList
            data={userProduct}
            keyExtractor={item => item.id}
            renderItem={(item: ListRenderItemInfo<Product>) => (
                <ProductItem title={item.item.title}
                             imgSrc={item.item.imageUrl}
                             price={item.item.price}
                             onSelect={() => onEditRedirect(item.item.id)}
                >
                    <StyledButton primary title="Edit" onPress={() => onEditRedirect(item.item.id)}/>
                    <StyledButton primary title="Delete" onPress={() => deleteHandler(item.item.id)}/>
                </ProductItem>
            )}
        />
    );
};

const styles = StyleSheet.create({});

export default UserProductsScreen;