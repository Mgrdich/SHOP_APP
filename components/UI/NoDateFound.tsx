import React from 'react';
import {StyleSheet, View} from "react-native";
import StyledText from "../Styled/StyledText";

interface NoDataFoundProps {
    text?: string
}

const NoDataFound: React.FC<NoDataFoundProps> = ({text = 'No Data Found'}) => {
    return (
        <View style={styles.screen}>
            <StyledText bold>{text}</StyledText>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default NoDataFound;