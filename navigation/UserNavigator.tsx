import React from "react";
import {screenDefaultOptions} from "./options";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Util from "../util/Util";
import {RootUsersStackParamList, USERS_STACK_SCREENS} from "./UserNavigatorTypes";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import AddEditProductsScreen from "../screens/user/AddEditProductsScreen";

const Users = createNativeStackNavigator<RootUsersStackParamList>();

const OrdersNavigator: React.FC = () => {
    return (
        <Users.Navigator
            screenOptions={({route, navigation}) => (
                {
                    ...screenDefaultOptions,
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
        >
            <Users.Screen
                name={USERS_STACK_SCREENS.USERS}
                component={UserProductsScreen}
                options={({route, navigation}) => (
                    {
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title="navigation"
                                    iconName={Util.isAndroid ? 'md-create' : 'ios-create-outline'}
                                    onPress={() => navigation.navigate(USERS_STACK_SCREENS.EDIT_USER, {
                                        prodId: ''
                                    })}
                                />
                            </HeaderButtons>
                        )
                    }
                )}
            />
            <Users.Screen
                name={USERS_STACK_SCREENS.EDIT_USER}
                component={AddEditProductsScreen}
                options={({route, navigation}) => (
                    {
                        headerLeft: null,
                        title: route.params.prodId ? 'Edit Product' : 'Add Product',
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item
                                    title="Save"
                                    iconName={Util.isAndroid ? 'md-checkmark' : 'ios-checkmark'}
                                    onPress={() => {route.params.submit()}}
                                />
                            </HeaderButtons>
                        )

                    }
                )}
            />
        </Users.Navigator>
    );
};

export default OrdersNavigator;