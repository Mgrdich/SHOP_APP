import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";

const MainNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <DrawerNavigator/>
        </NavigationContainer>
    )
};

export default MainNavigator;