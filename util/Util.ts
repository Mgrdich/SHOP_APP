import {Platform} from "react-native";

export default class Util {
    static isAndroid = Platform.OS === 'android'
    static isIOS = Platform.OS === 'ios'
}