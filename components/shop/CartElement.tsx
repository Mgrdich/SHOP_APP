import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import StyledText from "../Styled/StyledText";
import IconButton from "../UI/IconButton";
import StylingColors from "../../constants/StylingColors";
import Util from "../../util/Util";

interface CartElementProps {
    quantity: number,
    title: string,
    amount: number
    onRemove?: Function,
    onAdd?: Function,
    onSubtract?: Function,
}

const CartElement: React.FC<CartElementProps> = ({onRemove, onSubtract, onAdd, quantity, title, amount}) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <StyledText style={styles.quantity}>{quantity} </StyledText>
                <StyledText style={styles.mainText}>{title}</StyledText>
            </View>
            <View style={styles.itemData}>
                <StyledText style={styles.mainText}>${amount.toFixed(2)}</StyledText>
                {onRemove && (
                    <IconButton iconName={Util.isAndroid ? 'md-trash' : 'ios-trash'}
                                iconSize={23}
                                iconColor={StylingColors.red}
                                onPress={onRemove}
                                style={styles.deleteButton}
                    />
                )}
                {onAdd && (
                    <IconButton iconName={Util.isAndroid ? 'md-add-circle' : 'ios-add-circle'}
                                iconSize={23}
                                iconColor={StylingColors.red}
                                onPress={onAdd}
                                style={styles.addButton}
                    />
                )}
                {onSubtract && (
                    <IconButton iconName={Util.isAndroid ? 'md-remove-circle' : 'ios-remove-circle'}
                                iconSize={23}
                                iconColor={StylingColors.red}
                                onPress={onSubtract}
                                style={styles.subtractButton}
                    />
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
    },
    addButton: {},
    subtractButton: {}
});

export default CartElement;