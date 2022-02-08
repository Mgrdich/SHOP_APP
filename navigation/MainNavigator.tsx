import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import {useAppSelector} from "../hooks/redux";
import AuthNavigator from "./AuthNavigator";

const MainNavigator: React.FC = () => {
    const isAuth: boolean = useAppSelector(state => state.auth.userId);

    return (
        <NavigationContainer>
            {
                isAuth ? <DrawerNavigator/> : <AuthNavigator/>
            }
        </NavigationContainer>
    )
};

export default MainNavigator;