import React from 'react';
import FullScreen from "./FullScreen";
import {ActivityIndicator, ActivityIndicatorProps} from "react-native";
import StylingColors from "../../constants/StylingColors";

interface PageLoadingProps extends ActivityIndicatorProps {
}

const PageLoading: React.FC<PageLoadingProps> = ({color, size, ...props}) => {
    return (
        <FullScreen>
            <ActivityIndicator {...props}
                               color={color ? color : StylingColors.primary}
                               size={size ? size : 'large'}
            />
        </FullScreen>
    );
};

export default PageLoading;