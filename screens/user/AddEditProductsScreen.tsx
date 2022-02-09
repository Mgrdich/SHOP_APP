import React, {useCallback, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {UsersNavigatorProps} from "../../navigation/types";
import {USERS_STACK_SCREENS} from "../../navigation/UserNavigatorTypes";
import InputLabel from "../../components/UI/InputLabel";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createProduct, editProduct, productDataType} from "../../store/actions/products";
import useForm from "../../hooks/useForm";
import Validation, {ValidationRules} from "../../util/Validation";
import useLoading from "../../hooks/useLoading";
import SomethingWentWrong from "../../components/UI/SomethingWentWrong";
import PageLoading from "../../components/UI/PageLoading";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Util from "../../util/Util";


type AddEditProductsScreenProps = UsersNavigatorProps<USERS_STACK_SCREENS.EDIT_USER>;

enum FORM_NAMES {
    title = 'title',
    imageUrl = 'imageUrl',
    price = 'price',
    description = 'description'
}

const AddEditProductsScreen: React.FC<AddEditProductsScreenProps> = ({navigation, route}) => {
    const {isLoading, setLoading, isError, setError} = useLoading();
    const prodId: string = route.params.prodId;
    const editedProduct = useAppSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const isEditPage: boolean = !!editedProduct;

    const dispatch = useAppDispatch();

    const {state, onChangeHandler, isValidForSubmit} = useForm({
        [FORM_NAMES.title]: editedProduct ? editedProduct.title : '',
        [FORM_NAMES.imageUrl]: editedProduct ? editedProduct.imageUrl : '',
        [FORM_NAMES.price]: editedProduct ? editedProduct.price : null,
        [FORM_NAMES.description]: editedProduct ? editedProduct.description : ''
    }, {
        [FORM_NAMES.title]: Validation.requiredRule(FORM_NAMES.title),
        [FORM_NAMES.imageUrl]: Validation.combineRules(FORM_NAMES.imageUrl,
            [ValidationRules.required, ValidationRules.url]
        ),
        [FORM_NAMES.price]: Validation.combineRules(FORM_NAMES.price,
            [ValidationRules.required, ValidationRules.number]
        ),
        [FORM_NAMES.description]: Validation.requiredRule(FORM_NAMES.description)
    });

    const submitHandler = useCallback(function () {
        if (!isValidForSubmit()) {
            return;
        }

        setLoading(true);
        let promise: Promise<void>;

        if (isEditPage) {
            promise = dispatch(editProduct(prodId, state.formData as productDataType));
        } else {
            promise = dispatch(createProduct(state.formData as productDataType));
        }

        promise.then(function () {
            setLoading(false);
            navigation.goBack();
        }).catch(function (err) {
            setError();
        });

    }, [isEditPage, state, dispatch]);

    useEffect(function (){
        navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title="Save"
                        iconName={Util.isAndroid ? 'md-checkmark' : 'ios-checkmark'}
                        onPress={() => {submitHandler()}}
                    />
                </HeaderButtons>
            )
        })
    },[navigation, submitHandler]);


    if (isError) {
        return <SomethingWentWrong />;
    }

    if (isLoading) {
        return <PageLoading/>;
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <InputLabel onChangeText={(text) => onChangeHandler(FORM_NAMES.title, text)}
                            title="Title"
                            autoCapitalize="sentences"
                            autoCorrect
                            value={state.formData[FORM_NAMES.title]}
                            errorMessage={state.errors[FORM_NAMES.title]}
                />
                <InputLabel onChangeText={(text) => onChangeHandler(FORM_NAMES.imageUrl, text)}
                            title="Image Url"
                            value={state.formData[FORM_NAMES.imageUrl]}
                            errorMessage={state.errors[FORM_NAMES.imageUrl]}
                />
                <InputLabel onChangeText={(text) => onChangeHandler(FORM_NAMES.price, parseFloat(text))}
                            title="Price"
                            keyboardType="decimal-pad"
                            value={state.formData[FORM_NAMES.price]}
                            errorMessage={state.errors[FORM_NAMES.price]}
                />
                <InputLabel onChangeText={(text) => onChangeHandler(FORM_NAMES.description, text)}
                            title="Description"
                            value={state.formData[FORM_NAMES.description]}
                            errorMessage={state.errors[FORM_NAMES.description]}
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