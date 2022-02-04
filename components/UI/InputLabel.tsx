import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from "react-native";
import StyledText from "../Styled/StyledText";
import FU from "../../util/FunctionUtil";
import STYLING_COLORS from "../../constants/StylingColors";

interface InputLabelProps extends TextInputProps {
    title: string,
    errorMessage?: string
}

const InputLabel: React.FC<InputLabelProps> = ({title, isValid, errorMessage, value ,...textInputProps}) => {
    let strValue: string = '';

    if (value) {
        strValue = FU.isString(value) ? value : value.toString();
    }

    return (
        <View style={styles.formControl}>
            <StyledText bold style={styles.label}>{title}</StyledText>
            <TextInput {...textInputProps} style={styles.input} value={strValue}/>
            {errorMessage && (
                <StyledText style={styles.error}>{errorMessage}</StyledText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    error: {
        color: STYLING_COLORS.red
    }
});

export default InputLabel;