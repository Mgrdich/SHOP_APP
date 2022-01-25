import React from 'react';
import {Button, ButtonProps, StyleSheet, View} from "react-native";
import StylingColors from "../../constants/StylingColors";

interface StyledButtonProps extends ButtonProps {
    primary?: boolean,
    accent?: boolean
}

const StyledButton: React.FC<StyledButtonProps> = ({primary, accent, ...props}) => {
    let colorStyle = '';

    if (primary) {
        colorStyle = styles.primary.color;
    } else if (accent) {
        colorStyle = styles.accent.color;
    }

    return (
        <View>
            <Button color={colorStyle} {...props}/>
        </View>
    );
};

const styles = StyleSheet.create({
    primary: {
        color: StylingColors.primary
    },
    accent: {
        color: StylingColors.accent
    }
});

export default StyledButton;