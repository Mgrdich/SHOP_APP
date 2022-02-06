import React from 'react';
import {StyleSheet, FlatList} from "react-native";
import OrderItem from '../../components/shop/OrderItem';
import {useAppSelector} from "../../hooks/redux";
import {OrdersNavigatorProps} from "../../navigation/types";
import {ORDERS_STACK_SCREENS} from "../../navigation/OrderNavigatorTypes";
import NoDataFound from "../../components/UI/NoDateFound";
import {fetchOrders} from "../../store/actions/orders";
import SomethingWentWrong from "../../components/UI/SomethingWentWrong";
import PageLoading from "../../components/UI/PageLoading";
import useFetchDispatch from "../../hooks/useFetchDispatch";


type OrderScreenProps = OrdersNavigatorProps<ORDERS_STACK_SCREENS.Orders>;

const OrderScreen: React.FC<OrderScreenProps> = ({navigation, route}) => {
    const {isLoading, isError, isRefreshing ,fetchAgainFn , fetchAgainTimeStampFn} = useFetchDispatch(fetchOrders);
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
            onRefresh={fetchAgainTimeStampFn}
            refreshing={isRefreshing}
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

export default OrderScreen;