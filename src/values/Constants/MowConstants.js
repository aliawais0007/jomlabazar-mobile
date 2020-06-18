import {Dimensions, Platform} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const footerHeight = hp("8%");
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const platform = Platform.OS;
export const statusBarHeight = getStatusBarHeight();
export const navbarHeight = hp("6%");
export const API_ROOT = "http://192.168.168.61/";