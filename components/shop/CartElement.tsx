import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import StyledText from "../Styled/StyledText";

interface CartElementProps {
    deletable: boolean,
    onRemove: Function,
    quantity: number,
    title: string,
    amount: number
}

const CartElement: React.FC<CartElementProps> = ({deletable, onRemove, quantity, title, amount}) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <StyledText style={styles.quantity}>{quantity} </StyledText>
                <StyledText style={styles.mainText}>{title}</StyledText>
            </View>
            <View style={styles.itemData}>
                <StyledText style={styles.mainText}>${amount.toFixed(2)}</StyledText>
                {deletable && (
                    <TouchableOpacity
                        onPress={onRemove}
                        style={styles.deleteButton}
                    >
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                            size={23}
                            color="red"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartElement;