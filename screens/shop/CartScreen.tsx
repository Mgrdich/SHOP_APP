import React from 'react';
import {StyleSheet, View} from "react-native";
import StyledText from "../../components/Styled/StyledText";

interface CartScreenProps {

}

const CartScreen: React.FC<CartScreenProps> = () => {

    return (
        <View>
            <View>
                <StyledText>Total</StyledText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default CartScreen;