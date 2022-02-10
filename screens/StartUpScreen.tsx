import React from 'react';
import PageLoading from "../components/UI/PageLoading";
import {StartScreenPropsNavigationProp} from "../navigation/types";
import {STARTUP_STACK_SCREENS} from "../navigation/StartUpScreenNavgator";


type StartScreenProps = StartScreenPropsNavigationProp<STARTUP_STACK_SCREENS.StartUpOverview>;

const StartUpScreen: React.FC<StartScreenProps> = () => {
    return (
        <PageLoading/>
    );
};

export default StartUpScreen;