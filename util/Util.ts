import {Platform} from "react-native";

/**
 * React native specific utils
 */
export default class Util {
    static isAndroid = Platform.OS === 'android'
    static isIOS = Platform.OS === 'ios'
}