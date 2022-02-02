import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from "react-native";
import StyledText from "../Styled/StyledText";

interface InputLabelProps extends TextInputProps {
    title: string,
    isValid?:boolean,
    errorMessage?:string
}

// TODO maybe add number support
const InputLabel: React.FC<InputLabelProps> = ({title, isValid, errorMessage,...textInputProps}) => {
    return (
        <View style={styles.formControl}>
            <StyledText bold style={styles.label}>{title}</StyledText>
            <TextInput {...textInputProps} style={styles.input}/>
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