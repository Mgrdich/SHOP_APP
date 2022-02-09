import React from 'react';
import {StyleSheet} from "react-native";
import FullScreen from "./FullScreen";
import StyledText from "../Styled/StyledText";
import StyledButton from "../Styled/StyledButton";

interface SomethingWentWrongProps {
    onPress?: Function,
    btnText?: string,
    text?: string
}

const SomethingWentWrong: React.FC<SomethingWentWrongProps> = ({text, btnText, onPress}) => {
    return (
        <FullScreen>
            <StyledText style={styles.text} bold>{text || 'Something went Wrong'}</StyledText>
            {onPress && <StyledButton style={styles.btn}
                                      primary
                                      title={btnText ? btnText : 'Try me'}
                                      onPress={onPress}
            />
            }
        </FullScreen>
    );
};

const styles = StyleSheet.create({
    btn: {
        marginTop: 10
    },
    text: {
        fontSize: 20
    }
});

export default SomethingWentWrong;