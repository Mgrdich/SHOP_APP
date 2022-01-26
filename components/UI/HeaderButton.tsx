import React from 'react';
import {Platform, StyleSheet} from "react-native";
import {HeaderButton as HeaderButtonLib} from "react-navigation-header-buttons";
import {Ionicons} from "@expo/vector-icons";
import StylingColors from "../../constants/StylingColors";


interface HeaderButtonProps extends HeaderButtonLib {}

const HeaderButton: React.FC<HeaderButtonProps> = (props) => {
    return (
        <HeaderButtonLib {...props}
                         IconComponent={Ionicons}
                         iconSize={23}
                         color={Platform.OS === 'android' ? 'white' : StylingColors.primary}
        />
    );
};

export default HeaderButton;