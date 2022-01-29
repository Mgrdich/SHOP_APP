import Util from "../util/Util";
import STYLING_COLORS from "../constants/StylingColors";
import {PROJECT_FONTS} from "../constants/Fonts";
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: STYLING_COLORS.primary
    }
});

export const screenDefaultOptions = {
    headerStyle: Util.isAndroid ? styles.headerStyle : {},
    headerTintColor: Util.isAndroid ? 'white' : STYLING_COLORS.primary,
    headerTitleStyle: {
        fontFamily: PROJECT_FONTS.openSansBold
    },
    headerBackTitleStyle: {
        fontFamily: PROJECT_FONTS.openSans
    },
}
