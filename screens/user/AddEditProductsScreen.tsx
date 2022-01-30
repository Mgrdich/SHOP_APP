import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {UsersNavigatorProps} from "../../navigation/types";
import {USERS_STACK_SCREENS} from "../../navigation/UserNavigatorTypes";
import StyledText from "../../components/Styled/StyledText";
import InputLabel from "../../components/UI/InputLabel";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

type AddEditProductsScreenProps = UsersNavigatorProps<USERS_STACK_SCREENS.EDIT_USER>;

const AddEditProductsScreen: React.FC<AddEditProductsScreenProps> = ({navigation, route}) => {
    const prodId: string = route.params.prodId;
    const editedProduct = useAppSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useAppDispatch();

    // TODO Hook me up in a custom one
    const [title, setTitle] = useState<string>(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState<string>(
        editedProduct ? editedProduct.imageUrl : ''
    );
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>(
        editedProduct ? editedProduct.description : ''
    );

    const submitHandler = useCallback(function () {
        navigation.goBack();
    }, []);

    useEffect(() => {
        navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <StyledText>
                {route.params.prodId}
            </StyledText>
            <View style={styles.form}>
                <InputLabel value={title}
                            onChangeText={text => setTitle(text)}
                            title="Title"
                />
                <InputLabel value={imageUrl}
                            onChangeText={text => setImageUrl(text)}
                            title="Image Url"
                />
                <InputLabel value={price}
                            onChangeText={text => setPrice(text)}
                            title="Price"
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