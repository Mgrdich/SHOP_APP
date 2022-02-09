import React, {useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getItemAsync} from "expo-secure-store";
import useLoading from "../hooks/useLoading";
import {auth} from "../store/actions/auth";
import StartUpScreenNavigator from "./StartUpScreenNavigator";
import AuthNavigator from "./AuthNavigator";

const MainNavigator: React.FC = () => {
    const {isLoading , setLoading, setError} = useLoading();
    const isAuth: boolean = !!useAppSelector(state => state.auth.userId);
    const dispatch = useAppDispatch();

    useEffect(function () {
        const tryLogin = async (): Promise<void> => {
            setLoading(true);
            const userData: string | null = await getItemAsync('userData');
            setLoading(false);
            if (userData) {
                const transformedData: {
                    token: string,
                    userId: string
                } = JSON.parse(userData);
                dispatch(auth(transformedData.token, transformedData.userId));
            }
        }

        tryLogin()
            .catch(function () {
                setError();
            });
    }, [dispatch])

    let Navigator: React.ReactNode;

    if(isLoading) {
        Navigator = <StartUpScreenNavigator/>;
    } else if(isAuth) {
        Navigator = <DrawerNavigator/>;
    } else {
        Navigator = <AuthNavigator/>
    }

    return (
        <NavigationContainer>
            {Navigator}
        </NavigationContainer>
    )
};

export default MainNavigator;