import React from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet} from "react-native";
import Card from "../../components/UI/Card";
import InputLabel from "../../components/UI/InputLabel";
import useForm from "../../hooks/useForm";
import Validation, {ValidationRules} from "../../util/Validation";
import StyledButton from "../../components/Styled/StyledButton";

interface AuthScreenProps {

}

enum FORM_NAMES {
    email = 'email',
    password = 'password'
}

const AuthScreen: React.FC<AuthScreenProps> = () => {
    const {state, onChangeHandler, isValidForSubmit} = useForm({
        [FORM_NAMES.email]: '',
        [FORM_NAMES.password]: ''
    }, {
        [FORM_NAMES.email]: Validation.combineRules(FORM_NAMES.password,
            [ValidationRules.required, ValidationRules.email]
        ),
        [FORM_NAMES.password]: Validation.combineRules(FORM_NAMES.password,
            [ValidationRules.required, ValidationRules.minLength]
        )
    });

    const submitForm = function () {
        if (!isValidForSubmit()) {
            return;
        }

    };

    return (
        <KeyboardAvoidingView behavior="padding"
                              keyboardVerticalOffset={50}
                              style={styles.screen}
        >
            <Card style={styles.authContainer}>
                <ScrollView>
                    <InputLabel title="email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={(text) => onChangeHandler(FORM_NAMES.email, text)}
                                value={state.formData[FORM_NAMES.email]}
                                errorMessage={state.errors[FORM_NAMES.email]}
                    />
                    <InputLabel title="password"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={(text) => onChangeHandler(FORM_NAMES.password, text)}
                                value={state.formData[FORM_NAMES.password]}
                                errorMessage={state.errors[FORM_NAMES.password]}
                                secureTextEntry
                    />
                    <StyledButton title="Login" onPress={() => {
                    }}/>
                    <StyledButton title="Switch ti Sign Up" onPress={() => {
                    }}/>
                </ScrollView>
            </Card>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    authContainer: {
        width: '80%',
        maxWidth: 400,
        height: '50%',
        maxHeight: 400,
        padding: 10
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AuthScreen;