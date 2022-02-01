import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {UsersNavigatorProps} from "../../navigation/types";
import {USERS_STACK_SCREENS} from "../../navigation/UserNavigatorTypes";
import InputLabel from "../../components/UI/InputLabel";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createProduct, editProduct, productDataType} from "../../store/actions/products";
import useForm from "../../hooks/useForm";

type AddEditProductsScreenProps = UsersNavigatorProps<USERS_STACK_SCREENS.EDIT_USER>;

const AddEditProductsScreen: React.FC<AddEditProductsScreenProps> = ({navigation, route}) => {
    const prodId: string = route.params.prodId;
    const editedProduct = useAppSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const isEditPage: boolean = !!editedProduct;

    const dispatch = useAppDispatch();  

    const {state, onChangeHandler} = useForm({
        title: editedProduct ? editedProduct.title : '',
        imageUrl: editedProduct ? editedProduct.imageUrl : '',
        price: editedProduct ? editedProduct.price : null,
        description: editedProduct ? editedProduct.description : ''
    });

    const submitHandler = useCallback(function () {
        if (isEditPage) {
            dispatch(editProduct(prodId, state.formData as productDataType));
        } else {
            dispatch(createProduct(state.formData as productDataType));
        }

        navigation.goBack();
    }, [isEditPage, state.formData, dispatch]);

    useEffect(() => {
        navigation.setParams({submit: submitHandler});
    }, [submitHandler]);


    return (
        <ScrollView>
            <View style={styles.form}>
                <InputLabel onChangeText={(text) => onChangeHandler('title', text)}
                            title="Title"
                            autoCapitalize="sentences"
                            autoCorrect
                            value={state.formData['title']}
                />
                <InputLabel onChangeText={(text) => onChangeHandler('imageUrl', text)}
                            title="Image Url"
                            value={state.formData['imageUrl']}
                />
                <InputLabel onChangeText={(text) => onChangeHandler('price', parseFloat(text))}
                            title="Price"
                            keyboardType="decimal-pad"
                            value={state.formData['price'].toString()}
                />
                <InputLabel onChangeText={(text) => onChangeHandler('description', text)}
                            title="Description"
                            value={state.formData['description']}
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