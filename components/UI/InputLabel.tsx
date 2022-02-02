import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from "react-native";
import StyledText from "../Styled/StyledText";
import FU from "../../util/FunctionUtil";

interface InputLabelProps extends TextInputProps {
    title: string,
    isValid?:boolean,
    errorMessage?:string
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
            {errorMessage && !isValid && (
                <StyledText className="error">{errorMessage}</StyledText>
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
    }
});

export default InputLabel;