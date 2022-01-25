import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import ProductsNavigator from "./ProductsNavigator";

const MainNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <ProductsNavigator/>
        </NavigationContainer>
    )
};

export default MainNavigator;