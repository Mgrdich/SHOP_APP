import React from 'react';
import {StyleSheet, View} from "react-native";

interface FullScreenProps {
    children: React.ReactNode
}

// TODO maybe add direction config
const FullScreen: React.FC<FullScreenProps> = ({children}) => {
    return (
        <View style={styles.screen}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    }
});

export default FullScreen;