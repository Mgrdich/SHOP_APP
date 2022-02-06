import React, {useCallback, useEffect} from 'react';
import {StyleSheet, FlatList} from "react-native";
import OrderItem from '../../components/shop/OrderItem';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {OrdersNavigatorProps} from "../../navigation/types";
import {ORDERS_STACK_SCREENS} from "../../navigation/OrderNavigatorTypes";
import NoDataFound from "../../components/UI/NoDateFound";
import useLoading from "../../hooks/useLoading";
import {fetchOrders} from "../../store/actions/orders";
import SomethingWentWrong from "../../components/UI/SomethingWentWrong";
import PageLoading from "../../components/UI/PageLoading";
import useFetchDispatch from "../../hooks/useFetchDispatch";


type OrderScreenProps = OrdersNavigatorProps<ORDERS_STACK_SCREENS.Orders>;

const OrderScreen: React.FC<OrderScreenProps> = ({navigation, route}) => {
    const {isLoading, isError, fetchAgainFn} = useFetchDispatch(fetchOrders);
    const orders = useAppSelector(state => state.orders.orders);

    if (isError) {
        return <SomethingWentWrong onPress={fetchAgainFn}/>;
    }

    if (isLoading) {
        return <PageLoading/>;
    }

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