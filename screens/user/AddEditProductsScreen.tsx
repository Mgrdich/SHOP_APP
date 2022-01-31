import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from "react-native";
import {UsersNavigatorProps} from "../../navigation/types";
import {USERS_STACK_SCREENS} from "../../navigation/UserNavigatorTypes";
import StyledText from "../../components/Styled/StyledText";
import InputLabel from "../../components/UI/InputLabel";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createProduct, editProduct, productDataType} from "../../store/actions/products";

type AddEditProductsScreenProps = UsersNavigatorProps<USERS_STACK_SCREENS.EDIT_USER>;

const AddEditProductsScreen: React.FC<AddEditProductsScreenProps> = ({navigation, route}) => {
    const prodId: string = route.params.prodId;
    const editedProduct = useAppSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const isEditPage: boolean = !!editedProduct;

    const dispatch = useAppDispatch();

    // TODO Hook me up in a custom one
    const [title, setTitle] = useState<string>(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState<string>(
        editedProduct ? editedProduct.imageUrl : ''
    );
    const [price, setPrice] = useState<number>(editedProduct ? editedProduct.price : null);
    const [description, setDescription] = useState<string>(
        editedProduct ? editedProduct.description : ''
    );

    const submitHandler = useCallback(function () {
        let obj: productDataType = {
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl
        };

        if (isEditPage) {
            dispatch(editProduct(prodId, obj));
        } else {
            dispatch(createProduct(obj));
        }

        navigation.goBack();
    }, [isEditPage, title, imageUrl, price, description, dispatch]);

    useEffect(() => {
        navigation.setParams({submit: submitHandler});
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <InputLabel value={title}
                            onChangeText={text => setTitle(text)}
                            title="Title"
                />
                <InputLabel value={imageUrl}
                            onChangeText={text => setImageUrl(text)}
                            title="Image Url"
                />
                <InputLabel value={price ? price.toString() : price}
                            onChangeText={text => setPrice(parseFloat(text))}
                            title="Price"
                            keyboardType="numeric"
                />
                <InputLabel value={description}
                            onChangeText={text => setDescription(text)}
                            title="Description"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    }
});

export default AddEditProductsScreen;