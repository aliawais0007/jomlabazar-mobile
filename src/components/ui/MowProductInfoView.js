import React from "react";
import PropTypes from 'prop-types';
import {View, Text, Image} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {mowColors} from "../../values/Colors/MowColors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {withNavigation} from "react-navigation";

class MowProductInfoView extends React.Component {

    static propTypes = {
        product: PropTypes.object,
        opacity: PropTypes.bool
    };

    static defaultProps = {
        opacity: false
    };

    render() {

        const product = this.props.product;

        return(

            <View
                style={{flexDirection: "row", width: "100%"}}>

                {/* product image */}
                <View
                    style={{flex: 1, alignItems: "center", justifyContent: "center"}}>

                    <Image
                        source={product["image"]}
                        resizeMode={"contain"}
                        style={{height: hp("12%"), width: hp("12%"), borderRadius: 10}}/>

                    {
                        this.props.opacity &&

                        <View
                            style={{
                                height: hp("15%"),
                                width: hp("15%"),
                                position: "absolute",
                                backgroundColor: "rgb(238, 238, 238)",
                                zIndex: 1,
                                borderRadius: 10,
                                opacity: 0.83,
                            }}/>
                    }

                </View>

                {/* info view */}
                <View
                    style={{marginLeft: 10, flex: 2}}>

                    {/* title text */}
                    <Text
                        style={{
                            fontSize: hp("1.7%"),
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "left",
                            color: mowColors.titleTextColor
                        }}>

                        {product["title"]}

                    </Text>

                    {/* price text */}
                    <Text
                        style={{
                            marginVertical: 10,
                            fontSize: hp("1.8%"),
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "left",
                            color: this.props.opacity ? "#b6babe" : mowColors.textColor
                        }}>

                        {product["currency"]}{product["price"]}

                    </Text>

                    <View
                        style={{flexDirection: "row", alignItems: "center"}}>

                        {
                            product["delivery"] &&

                            <FeatherIcon
                                name={"truck"}
                                style={[{color: mowColors.mainColor, fontSize: hp("2.5%")}]}/>
                        }

                        {
                            product["complete"] &&

                            <FeatherIcon
                                name={"check-circle"}
                                style={[{color: "#65b707", fontSize: hp("2.5%")}]}/>
                        }

                        {
                            product["cancel"] &&

                            <FeatherIcon
                                name={"x-circle"}
                                style={[{color: mowColors.mainColor, fontSize: hp("2.5%")}]}/>
                        }

                        {
                            product["return"] &&

                            <FeatherIcon
                                name={"x-circle"}
                                style={[{color: mowColors.mainColor, fontSize: hp("2.5%")}]}/>
                        }

                        {/* order situation */}
                        <Text
                            style={{
                                marginLeft: 5,
                                fontSize: hp("1.6%"),
                                fontWeight: "bold",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: this.props.opacity ? mowColors.textColor : mowColors.titleTextColor
                            }}>

                            {product["productInfo"]}

                        </Text>

                    </View>

                </View>

            </View>

        )

    }
}

export default withNavigation(MowProductInfoView);