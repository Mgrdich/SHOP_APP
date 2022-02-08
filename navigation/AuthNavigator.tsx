import React from "react";
import {screenDefaultOptions} from "./options";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {RootOrdersStackParamList} from "./OrderNavigatorTypes";
import AuthScreen from "../screens/user/AuthScreen";
import {AUTH_STACK_SCREEN} from "./AuthNavigatorTypes";

const AuthStack = createNativeStackNavigator<RootOrdersStackParamList>();

const AuthNavigator: React.FC = () => {
    return (
        <AuthStack.Navigator
            screenOptions={screenDefaultOptions}
        >
            <AuthStack.Screen
                name={AUTH_STACK_SCREEN.Auth}
                component={AuthScreen}
            />
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;