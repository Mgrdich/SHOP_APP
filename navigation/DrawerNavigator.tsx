import React from "react";
import {StyleSheet, View} from "react-native";
import {DRAWERS, RootDrawerParams} from "./DrawerNavigatorTypes";
import StylingColors from "../constants/StylingColors";
import OrdersNavigator from "./OrderNavigator";
import ProductsNavigator from "./ProductsNavigator";
import UserNavigator from "./UserNavigator";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {PROJECT_FONTS} from "../constants/Fonts";
import {Ionicons} from "@expo/vector-icons";
import Util from "../util/Util";
import {useAppDispatch} from "../hooks/redux";
import {logout} from "../store/actions/auth";

const Drawers = createDrawerNavigator<RootDrawerParams>();

function CustomDrawerContent({onPress, ...props}) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="logout" onPress={onPress}/>
        </DrawerContentScrollView>
    );
}

const DrawerNavigator: React.FC = () => {
    const dispatch = useAppDispatch();
    return (
        <Drawers.Navigator
            screenOptions={{
                drawerActiveTintColor: styles.DrawerTintColor.color,
                drawerLabelStyle: styles.DrawerLabelStyle,
                headerShown: false,
                drawerInactiveTintColor: StylingColors.primary,
            }}
            drawerContent={props => (<CustomDrawerContent {...props} onPress={() => dispatch(logout())}/>)}
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
            <Drawers.Screen name={DRAWERS.UsersStack}
                            component={UserNavigator}
                            options={(navigation, route) => (
                                {
                                    drawerIcon: (drawerConfig) => (
                                        <Ionicons
                                            name={Util.isAndroid ? 'md-create' : 'ios-create'}
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