import React from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet} from "react-native";
import Card from "../../components/UI/Card";
import InputLabel from "../../components/UI/InputLabel";
import useForm from "../../hooks/useForm";
import Validation, {ValidationRules} from "../../util/Validation";

interface AuthScreenProps {

}

enum FORM_NAMES {
    email = 'email',
    password = 'password'
}

const AuthScreen: React.FC<AuthScreenProps> = () => {
    const {state, onChangeHandler, validateForm} = useForm({
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
                    />
                </ScrollView>
            </Card>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    authContainer: {},
    screen: {}
});

export default AuthScreen;