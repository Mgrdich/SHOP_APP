import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";

interface CardProps {
    style: StyleProp<ViewStyle>,
    children: React.ReactNode
}

const Card: React.FC<CardProps> = ({style, children}) => {
    return <View style={{...styles.card, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});


export default Card;