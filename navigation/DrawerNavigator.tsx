import React from "react";
import {StyleSheet} from "react-native";
import {DRAWERS, RootDrawerParams} from "./DrawerNavigatorTypes";
import StylingColors from "../constants/StylingColors";
import OrdersNavigator from "./OrderNavigator";
import ProductsNavigator from "./ProductsNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {PROJECT_FONTS} from "../constants/Fonts";
import {Ionicons} from "@expo/vector-icons";
import Util from "../util/Util";

const Drawers = createDrawerNavigator<RootDrawerParams>();

const DrawerNavigator: React.FC = () => {
    return (
        <Drawers.Navigator
            screenOptions={{
                drawerActiveTintColor: styles.DrawerTintColor.color,
                drawerLabelStyle: styles.DrawerLabelStyle,
                headerShown: false,
                drawerInactiveTintColor: StylingColors.primary
            }}
        >
            <Drawers.Screen name={DRAWERS.ProductsStack}
                            component={ProductsNavigator}
                            options={(navigation, route) => (
                                {
                                    drawerIcon: (drawerConfig) => (
                                        <Ionicons
                                            name={Util.isAndroid ? 'md-cart' : 'ios-cart'}
                                            size={23}
                                            color={drawerConfig.color}
                                        />
                                    )
                                }
                            )}
            />
            <Drawers.Screen name={DRAWERS.OrdersStack}
                            component={OrdersNavigator}
                            options={(navigation, route) => (
                                {
                                    drawerIcon: (drawerConfig) => (
                                        <Ionicons
                                            name={Util.isAndroid ? 'md-list' : 'ios-list'}
                                            size={23}
                                            color={drawerConfig.color}
                                        />
                                    )
                                }
                            )}
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