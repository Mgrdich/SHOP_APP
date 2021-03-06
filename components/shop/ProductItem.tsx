import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import STYLING_COLORS from "../../constants/StylingColors";
import TouchablePlatform from "../platform/TouchablePlatform";
import StyledText from "../Styled/StyledText";

interface ProductItemProps {
    title: string
    imgSrc: string,
    price: number,
    onSelect: Function,
    children: React.ReactNode
}

const ProductItem: React.FC<ProductItemProps> = ({imgSrc, price, title, onSelect, children}) => {
    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <TouchablePlatform onPress={onSelect} useForeground>
                    <View>
                        <View style={styles.imageCont}>
                            <Image style={styles.image} source={{uri: imgSrc}}/>
                        </View>

                        <View style={styles.details}>
                            <StyledText bold style={styles.title}>{title}</StyledText>
                            <StyledText style={styles.price}>${price?.toFixed(2)}</StyledText>
                        </View>
                        <View style={styles.actions}>
                            {children}
                        </View>
                    </View>
                </TouchablePlatform>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20
    },
    imageCont: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20%',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: STYLING_COLORS.grayText
    },
    details: {
        alignItems: 'center',
        height: '20%',
        padding: 10
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    }
});

export default ProductItem;