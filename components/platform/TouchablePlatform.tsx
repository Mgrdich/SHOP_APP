import React from 'react';
import {
    Platform,
    TouchableNativeFeedback,
    TouchableNativeFeedbackProps,
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";

interface ITouchablePlatform extends TouchableNativeFeedbackProps, TouchableOpacityProps {}

const TouchablePlatform: React.FC<ITouchablePlatform> = ({children,...props}) => {
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        return (
            <TouchableNativeFeedback {...props}>
                {children}
            </TouchableNativeFeedback>
        )
    }

    return (
        <TouchableOpacity {...props}>
            {children}
        </TouchableOpacity>
    )
};

export default TouchablePlatform;