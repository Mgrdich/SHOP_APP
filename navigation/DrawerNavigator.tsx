import React from "react";
import {StyleSheet} from "react-native";
import {DRAWERS, RootDrawerParams} from "./DrawerNavigatorTypes";
import StylingColors from "../constants/StylingColors";
import OrdersNavigator from "./OrderNavigator";
import ProductsNavigator from "./ProductsNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {PROJECT_FONTS} from "../constants/Fonts";

const Drawers = createDrawerNavigator<RootDrawerParams>();

const DrawerNavigator: React.FC = () => {
    return (
        <Drawers.Navigator
            screenOptions={{
                drawerActiveTintColor: styles.DrawerTintColor.color,
                drawerLabelStyle: styles.DrawerLabelStyle,
                headerShown: false
            }}
        >
            <Drawers.Screen name={DRAWERS.Products}
                            component={ProductsNavigator}
            />
            <Drawers.Screen name={DRAWERS.Orders}
                            component={OrdersNavigator}
            />
        </Drawers.Navigator>
    )
}

const styles = StyleSheet.create({
    DrawerTintColor: {
        color: StylingColors.primary
    },
    DrawerTitleStyle: {
        fontWeight: "bold"
    },
    DrawerLabelStyle: {
        fontFamily: PROJECT_FONTS.openSansBold
    }
});

export default DrawerNavigator;