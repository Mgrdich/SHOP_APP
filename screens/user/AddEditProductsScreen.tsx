import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {UsersNavigatorProps} from "../../navigation/types";
import {USERS_STACK_SCREENS} from "../../navigation/UserNavigatorTypes";
import InputLabel from "../../components/UI/InputLabel";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createProduct, editProduct, productDataType} from "../../store/actions/products";
import useForm from "../../hooks/useForm";
import Validation from "../../util/Validation";


type AddEditProductsScreenProps = UsersNavigatorProps<USERS_STACK_SCREENS.EDIT_USER>;

enum FORM_NAMES {
    title = 'title',
    imageUrl = 'imageUrl',
    price = 'price',
    description = 'description'
}

const AddEditProductsScreen: React.FC<AddEditProductsScreenProps> = ({navigation, route}) => {
    const prodId: string = route.params.prodId;
    const editedProduct = useAppSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const isEditPage: boolean = !!editedProduct;

    const dispatch = useAppDispatch();

    const {state, onChangeHandler} = useForm({
        [FORM_NAMES.title]: editedProduct ? editedProduct.title : '',
        [FORM_NAMES.imageUrl]: editedProduct ? editedProduct.imageUrl : '',
        [FORM_NAMES.price]: editedProduct ? editedProduct.price : null,
        [FORM_NAMES.description]: editedProduct ? editedProduct.description : ''
    }, {
        [FORM_NAMES.title]: Validation.requiredRule(FORM_NAMES.title),
        [FORM_NAMES.imageUrl]: [Validation.requiredRule(FORM_NAMES.imageUrl)],
        [FORM_NAMES.price]: [Validation.requiredRule(FORM_NAMES.price), Validation.numberRule(FORM_NAMES.price)],
        [FORM_NAMES.description]: [Validation.requiredRule(FORM_NAMES.description)]
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