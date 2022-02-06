import React from 'react';
import StyledText from "../Styled/StyledText";
import FullScreen from "./FullScreen";

interface NoDataFoundProps {
    text?: string
}

const NoDataFound: React.FC<NoDataFoundProps> = ({text = 'No Data Found'}) => {
    return (
        <FullScreen>
            <StyledText bold>{text}</StyledText>
        </FullScreen>
    );
};
export default NoDataFound;
