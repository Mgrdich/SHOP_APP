import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from "react-native";
import StyledText from "../../components/Styled/StyledText";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import StylingColors from "../../constants/StylingColors";
import {ProductsNavigatorProps} from "../../navigation/types";
import {PRODUCTS_STACK_SCREENS} from "../../navigation/ProductsNavigationTypes";
import StyledButton from "../../components/Styled/StyledButton";
import CartElement from "../../components/shop/CartElement";
import {clearCart, removeFromCart} from "../../store/actions/cart";
import {addOrder} from "../../store/actions/orders";
import {ICartItemsElement} from "../../models/cartItem";
import {batch} from "react-redux";

type CartScreenProps = ProductsNavigatorProps<PRODUCTS_STACK_SCREENS.CartScreen>;


const CartScreen: React.FC<CartScreenProps> = ({navigation, route}) => {
    const dispatch = useAppDispatch();
    const cartTotalAmount: number = useAppSelector(state => state.cart.totalAmount);

    const cartItems: ICartItemsElement[] = useAppSelector(state => {
        const transformedCartItems: ICartItemsElement[] = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                ...state.cart.items[key]
            })
        }
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <StyledText bold style={styles.summaryText}>
                    Total <StyledText style={styles.amount}>${cartTotalAmount.toFixed(2)}</StyledText>
                </StyledText>
                <StyledButton title="Order Now" accent
                              onPress={() => {
                                  batch(() => {
                                      dispatch(addOrder(cartItems, cartTotalAmount));
                                      dispatch(clearCart());
                                  });
                              }}
                              disabled={!cartItems.length}
                />
            </View>
            <View style={styles.cartItemsCont}>
                <StyledText bold style={styles.cartItemsText}>Cart Items</StyledText>
                <FlatList data={cartItems}
                          style={styles.flatList}
                          keyExtractor={(item => item.productId)}
                          renderItem={(item: ListRenderItemInfo<ICartItemsElement>) => (
                              <CartElement
                                  title={item.item.prodTitle}
                                  amount={item.item.sum}
                                  deletable
                                  onRemove={() => dispatch(removeFromCart(item.item.productId))}
                                  quantity={item.item.quantity}
                              />
                          )}
                />
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
    },
    cartItemsCont: {
        alignItems: "center"
    },
    cartItemsText: {
        fontSize: 25
    },
    flatList: {
        width: '100%'
    }
});

export default CartScreen;