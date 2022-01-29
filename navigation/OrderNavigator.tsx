import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {screenDefaultOptions} from "./options";
import {ORDERS_STACK_SCREENS, RootOrdersStackParamList} from "./OrderNavigatorTypes";
import OrderScreen from "../screens/shop/OrderScreen";

const Orders = createNativeStackNavigator<RootOrdersStackParamList>();

const OrdersNavigator: React.FC = () => {
    return (
        <Orders.Navigator
            screenOptions={screenDefaultOptions}
        >
            <Orders.Screen
                name={ORDERS_STACK_SCREENS}
                component={OrderScreen}
            />
        </Orders.Navigator>
    );
};

export default OrdersNavigator;