import React from 'react';
import {Button, StyleSheet, View} from "react-native";

interface StyledButtonProps {

}

const StyledButton: React.FC<StyledButtonProps> = ({...props}) => {
    return (
        <View>
            <Button {...props}/>
        </View>
    );
};

const styles = StyleSheet.create({});

export default StyledButton;