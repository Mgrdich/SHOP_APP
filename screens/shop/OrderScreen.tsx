import React from 'react';
import {StyleSheet, FlatList} from "react-native";
import OrderItem from '../../components/shop/OrderItem';
import {useAppSelector} from "../../hooks/redux";
import {OrdersNavigatorProps} from "../../navigation/types";
import {ORDERS_STACK_SCREENS} from "../../navigation/OrderNavigatorTypes";
import NoDataFound from "../../components/UI/NoDateFound";


type OrderScreenProps = OrdersNavigatorProps<ORDERS_STACK_SCREENS.Orders>;

const OrderScreen: React.FC<OrderScreenProps> = ({navigation, route}) => {
    const orders = useAppSelector(state => state.orders.orders);

    if(!orders.length) {
        return (
            <NoDataFound text="No Orders Found"/>
        )
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({});

export default OrderScreen;