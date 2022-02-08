import React, {useState} from 'react';
import {ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native";
import Card from "../../components/UI/Card";
import InputLabel from "../../components/UI/InputLabel";
import useForm from "../../hooks/useForm";
import Validation, {ValidationRules} from "../../util/Validation";
import StyledButton from "../../components/Styled/StyledButton";
import {useAppDispatch} from "../../hooks/redux";
import {login, signup} from "../../store/actions/auth";
import useLoading from "../../hooks/useLoading";
import useErrorAlert from "../../hooks/useErrorAlert";
import StylingColors from "../../constants/StylingColors";
import {AuthNavigatorProps} from "../../navigation/types";
import {AUTH_STACK_SCREEN} from "../../navigation/AuthNavigatorTypes";
import Util from "../../util/Util";


enum FORM_NAMES {
    email = 'email',
    password = 'password'
}

type AuthScreenProps = AuthNavigatorProps<AUTH_STACK_SCREEN.Auth>;

const AuthScreen: React.FC<AuthScreenProps> = () => {
    const dispatch = useAppDispatch();
    const [isLogin, setLogin] = useState<boolean>(false);
    const {isLoading, isError, setError, setLoading} = useLoading();

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

    useErrorAlert(isError);

    const submitForm = function () {
        if (!isValidForSubmit()) {
            return;
        }
        let username: string = state.formData[FORM_NAMES.email];
        let password: string = state.formData[FORM_NAMES.password];

        let promise: Promise<void>;
        setLoading(true);
        if (isLogin) {
            promise = dispatch(login(username, password));
        } else {
            promise = dispatch(signup(username, password));
        }

        promise.then(function () {
            setLoading(false);
        }).catch(function () {
            setError();
        });
    };

    return (
        <KeyboardAvoidingView behavior={Util.isIOS ? "padding" : "height"}
                              keyboardVerticalOffset={50}
                              style={styles.screen}
        >
            <View style={styles.container}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <InputLabel title="Email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={(text) => onChangeHandler(FORM_NAMES.email, text)}
                                    value={state?.formData[FORM_NAMES.email]}
                                    errorMessage={state?.errors[FORM_NAMES.email]}
                        />
                        <InputLabel title="Password"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={(text) => onChangeHandler(FORM_NAMES.password, text)}
                                    value={state?.formData[FORM_NAMES.password]}
                                    errorMessage={state?.errors[FORM_NAMES.password]}
                                    secureTextEntry
                        />
                        <View style={styles.btnContainer}>
                            {isLoading ? <ActivityIndicator size="small" color={StylingColors.primary}/> :
                                <StyledButton primary
                                              title={isLogin ? 'Login' : 'Register'}
                                              onPress={submitForm}
                                />
                            }
                            <StyledButton style={styles.btn}
                                          primary
                                          title={`Switch to ${isLogin ? 'Sign Up' : 'Login'} `}
                                          onPress={() => {
                                              setLogin(prev => !prev)
                                          }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </View>
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
        flex: 1
    },
    btnContainer: {
        marginTop: 10
    },
    btn: {
        marginTop: 10
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default AuthScreen;