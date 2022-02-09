import React from "react";
import {screenDefaultOptions} from "./options";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddEditProductsScreen from "../screens/user/AddEditProductsScreen";
import {RootStartUpStackParamList , STARTUP_STACK_SCREENS} from "./StartUpScreenNavgator";

const Users = createNativeStackNavigator<RootStartUpStackParamList>();

const StartUpScreenNavigator: React.FC = () => {
    return (
        <Users.Navigator
            screenOptions={screenDefaultOptions}
        >
            <Users.Screen
                name={STARTUP_STACK_SCREENS.StartUpOverview}
                component={AddEditProductsScreen}
            />
        </Users.Navigator>
    );
};

export default StartUpScreenNavigator;