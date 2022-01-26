import React from 'react';
import {StyleSheet, Text, TextProps} from "react-native";
import {PROJECT_FONTS} from "../../constants/Fonts";

interface StyledTextProps extends TextProps {
    bold?: boolean
}

const StyledText: React.FC<StyledTextProps> = ({children, style = {}, bold, ...props}) => {
    return (
        <Text style={{...(bold ? styles.boldText : styles.text), ...style}} {...props}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily:  PROJECT_FONTS.openSans
    },
    boldText: {
        fontFamily: PROJECT_FONTS.openSansBold
    }
});

export default StyledText;