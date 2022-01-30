import React from 'react';
import {StyleSheet, FlatList} from "react-native";
import OrderItem from '../../components/shop/OrderItem';
import {useAppSelector} from "../../hooks/redux";
import {ProductsNavigatorProps} from "../../navigation/types";
import {ORDERS_STACK_SCREENS} from "../../navigation/OrderNavigatorTypes";


type OrderScreenProps = ProductsNavigatorProps<ORDERS_STACK_SCREENS.Orders>;

const OrderScreen: React.FC<OrderScreenProps> = ({navigation, route}) => {
    const orders = useAppSelector(state => state.orders.orders);

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