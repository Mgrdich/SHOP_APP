import React from 'react';
import {TouchableOpacity, TouchableOpacityProps} from "react-native";
import {Ionicons} from "@expo/vector-icons";

interface IconButtonProps extends TouchableOpacityProps {
    iconName: string, // Can be Fixed if Ionicons @types installed //TODO
    iconSize: number,
    iconColor: string
}

const IconButton: React.FC<IconButtonProps> = ({iconName, iconSize, iconColor, ...touchableOpacityProps}) => {
    return (
        <TouchableOpacity
            {...touchableOpacityProps}
        >
            <Ionicons
                name={iconName}
                size={iconSize}
                color={iconColor}
            />
        </TouchableOpacity>
    );
};

export default IconButton;