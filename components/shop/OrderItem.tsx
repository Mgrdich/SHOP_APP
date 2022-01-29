import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import Card from "../UI/Card";
import StyledText from "../Styled/StyledText";
import StyledButton from "../Styled/StyledButton";
import CartElement from "./CartElement";
import {ICartItemsElement} from "../../models/cartItem";

interface OrderItemProps {
    amount: number,
    date: Date,
    items: ICartItemsElement[]
}

const OrderItem: React.FC<OrderItemProps> = ({amount, date, items}) => {
    const [showDetails, setShowDetails] = useState<boolean>(false)
    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <StyledText style={styles.totalAmount}>${amount.toFixed(2)}</StyledText>
                <StyledText style={styles.date}>{date}</StyledText>
            </View>
            <StyledButton
                primary
                title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                }}
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {items.map(cartItem => (
                        <CartElement
                            key={cartItem.productId}
                            quantity={cartItem.quantity}
                            amount={cartItem.sum}
                            title={cartItem.prodTitle}
                        />
                    ))}
                </View>
            )}
        </Card>

    );
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }
});

export default OrderItem;