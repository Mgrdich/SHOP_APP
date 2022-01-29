import {Provider} from "react-redux";
import store from "./store";
import MainNavigator from "./navigation/MainNavigator";
import {useState} from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import 'react-native-gesture-handler';


function fetchFonts(): Promise<void> {
    return Font.loadAsync({
        'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
        'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf")
    })
}

export default function App() {
    const [fontLoaded, setFontLoad] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    if (!fontLoaded) {
        return (
            <AppLoading startAsync={fetchFonts}
                        onFinish={() => setFontLoad(true)}
                        onError={() => setError(true)}
            />
        )
    }

    if (error) {
        return <Text> Buy a better Mobile or Update your internet connection </Text>
    }

    return (
        <Provider store={store}>
            <MainNavigator/>
        </Provider>
    );
}