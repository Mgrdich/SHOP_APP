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


type OrderScreenProps = OrdersNavigatorProps<ORDERS_STACK_SCREENS.Orders>;

const OrderScreen: React.FC<OrderScreenProps> = ({navigation, route}) => {
    const {isLoading, setLoading, isError, setError} = useLoading();
    const orders = useAppSelector(state => state.orders.orders);
    const dispatch = useAppDispatch();

    const loadOrders = useCallback(async function (){
        setLoading(true);
        dispatch(fetchOrders())
            .then(function () {
                setLoading(false);
            }).catch(function (err) {
            setError(err.toString());
        });
    },[dispatch]);

    useEffect(function () {
        loadOrders().then();
    }, [loadOrders]);


    if (isError) {
        return <SomethingWentWrong onPress={loadOrders}/>;
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