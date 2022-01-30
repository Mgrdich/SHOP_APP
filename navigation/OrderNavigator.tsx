import React from "react";
import {screenDefaultOptions} from "./options";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {ORDERS_STACK_SCREENS, RootOrdersStackParamList} from "./OrderNavigatorTypes";
import OrderScreen from "../screens/shop/OrderScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import Util from "../util/Util";

const Orders = createNativeStackNavigator<RootOrdersStackParamList>();

const OrdersNavigator: React.FC = () => {
    return (
        <Orders.Navigator
            screenOptions={screenDefaultOptions}
        >
            <Orders.Screen
                name={ORDERS_STACK_SCREENS.Orders}
                component={OrderScreen}
                options={({route, navigation}) => (
                    {
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title="navigation"
                                    iconName={Util.isAndroid ? 'md-menu' : 'ios-menu'}
                                    onPress={() => navigation.toggleDrawer()}
                                />
                            </HeaderButtons>
                        )
                    }
                )}
            />
        </Orders.Navigator>
    );
};

export default OrdersNavigator;