import React from 'react';
import {StyleSheet} from "react-native";
import {UsersNavigatorProps} from "../../navigation/types";
import {USERS_STACK_SCREENS} from "../../navigation/UserNavigatorTypes";
import StyledText from "../../components/Styled/StyledText";

type EditProductsScreenProps = UsersNavigatorProps<USERS_STACK_SCREENS.EDIT_USER>;

const EditProductsScreen: React.FC<EditProductsScreenProps> = ({navigation,route}) => {
    const editMode = !!route.params.prodId;


    return (
        <StyledText>
            {route.params.prodId}
        </StyledText>
    );
};

const styles = StyleSheet.create({});

export default EditProductsScreen;