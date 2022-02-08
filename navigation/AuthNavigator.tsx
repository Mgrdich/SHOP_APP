import React from "react";
import {screenDefaultOptions} from "./options";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ORDERS_STACK_SCREENS, RootOrdersStackParamList} from "./OrderNavigatorTypes";
import OrderScreen from "../screens/shop/OrderScreen";

const AuthStack = createNativeStackNavigator<RootOrdersStackParamList>();

const AuthNavigator: React.FC = () => {
    return (
        <AuthStack.Navigator
            screenOptions={screenDefaultOptions}
        >
            <AuthStack.Screen
                name={ORDERS_STACK_SCREENS.Orders}
                component={OrderScreen}
            />
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;