import React from 'react';
import {StyleSheet, Text, TextProps} from "react-native";

interface StyledTextProps extends TextProps {
    bold?: boolean
}

const StyledText: React.FC<StyledTextProps> = ({children, style = {}, bold, ...props}) => {
    return (
        <Text style={{...(bold ? styles.boldText : styles.text), ...style}} {...props}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {},
    boldText: {}
});

export default StyledText;