import React from 'react';
import {StyleSheet, FlatList} from "react-native";
import OrderItem from '../../components/shop/OrderItem';
import {useAppSelector} from "../../hooks/redux";

interface OrderScreenProps {

}

const OrderScreen: React.FC<OrderScreenProps> = () => {
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