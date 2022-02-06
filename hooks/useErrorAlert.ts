import {useEffect} from "react";
import {Alert} from "react-native";

export default function useErrorAlert(
    isError: boolean,
    text: string = 'Something Went Wrong',
    secondaryText: string = 'Tru again later') {

    useEffect(function () {
        if (isError) {
            Alert.alert(text, secondaryText, [
                {text: 'Okay', style: 'default'}
            ]);
        }
    }, [isError, text, secondaryText]);
}