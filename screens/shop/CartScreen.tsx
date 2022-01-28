import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import StyledText from "../../components/Styled/StyledText";
import {useAppSelector} from "../../hooks/redux";
import StylingColors from "../../constants/StylingColors";
import {ProductsNavigatorProps} from "../../navigation/types";
import {PRODUCTS_STACK_SCREENS} from "../../navigation/ProductsNavigationTypes";

type CartScreenProps = ProductsNavigatorProps<PRODUCTS_STACK_SCREENS.CartScreen>;

const CartScreen: React.FC<CartScreenProps> = ({navigation, route}) => {
    const cartTotalAmount: number = useAppSelector(state => state.cart.totalAmount);


    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <StyledText bold style={styles.summaryText}>
                    Total <StyledText style={styles.amount}>${cartTotalAmount}</StyledText>
                </StyledText>
                <View>
                    <StyledText bold>Cart Items</StyledText>
                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        // flex:1,
        margin: 20,
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontSize: 20
    },
    amount: {
        color: StylingColors.accent
    }
});

export default CartScreen;