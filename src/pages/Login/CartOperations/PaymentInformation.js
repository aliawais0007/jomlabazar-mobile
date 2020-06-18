import React from "react";
import {View, Text, Image} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {MowInfoHeader} from "../../../components/ui/MowInfoHeader";
import {borderStyle, pageContainerStyle} from "../../../values/Styles/MowStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MowInput} from "../../../components/ui/Common/Input/MowInput";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {MowCheckBox} from "../../../components/ui/Common/CheckBox/MowCheckBox";

export default class PaymentInformation extends React.Component {

    state = {
        creditCard: true,
        paypal: false,
        cardNumber: "",
        cardOwnerName: "",
        expiryDate: "",
        cvc: ""
    };

    // to store entered regular from user
    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        })
    };

    render() {

        return(

            <MowContainer
                style={{backgroundColor: mowColors.pageBGDarkColor}}
                title={mowStrings.paymentInformation.title}>

                <MowInfoHeader
                    activeIndex={2}/>

                <KeyboardAwareScrollView
                    style={[pageContainerStyle, {marginTop: 20}]}>

                    {/* credit card view */}
                    <View
                        style={[paymentStyle.container, {backgroundColor: mowColors.viewBGColor}]}>

                        {/* header view */}
                        <View
                            style={{flexDirection: "row", paddingRight: wp("3%"), alignItems: "center", ...borderStyle, borderWidth: 0, borderBottomWidth: 1}}>

                            <View
                                style={{flexDirection: "row", flex: 1, justifyContent: "flex-start", alignItems: "center"}}>

                                <MowCheckBox
                                    onPress={() => {this.setState({creditCard: true, paypal: false})}}
                                    checkedColor={mowColors.mainColor}
                                    checked={this.state.creditCard}
                                    containerStyle={checkBoxStyle.container}/>

                                <Text
                                    style={{
                                        fontSize: hp("1.8%"),
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "left",
                                        color: mowColors.titleTextColor
                                    }}>

                                    {mowStrings.paymentInformation.creditCard}

                                </Text>

                            </View>

                            <View
                                style={{flexDirection: "row", flex: 1, justifyContent: "flex-end"}}>

                                <View
                                    style={paymentStyle.logoView}>

                                    {/* visa logo image */}
                                    <Image
                                        style={paymentStyle.logo}
                                        source={require("../../../assets/logo/visa.png")}
                                        resizeMode={"contain"}/>

                                </View>

                                <View
                                    style={[paymentStyle.logoView, {marginLeft: 10}]}>

                                    {/* mastercard logo image */}
                                    <Image
                                        style={[paymentStyle.logo]}
                                        source={require("../../../assets/logo/mastercard.png")}
                                        resizeMode={"contain"}/>

                                </View>

                            </View>

                        </View>

                        {/* content view */}
                        {
                            this.state.creditCard &&

                                <View
                                    style={{paddingHorizontal: wp("3%")}}>

                                    {/* card number input */}
                                    <MowInput
                                        iconColor={"#b6babe"}
                                        rightIcon={"lock"}
                                        onChangeText={value => this.onChangeText('cardNumber', value)}
                                        placeholder={mowStrings.placeholder.cardNumber}
                                        type={"number"}/>

                                    {/* card owner name input */}
                                    <MowInput
                                        onChangeText={value => this.onChangeText('cardOwnerName', value)}
                                        placeholder={mowStrings.placeholder.cardOwnerName}
                                        type={"text"}/>

                                    <View
                                        style={{flexDirection: "row"}}>

                                        {/* expiry date input */}
                                        <MowInput
                                            containerStyle={{flex: 1, marginRight: wp("5%")}}
                                            onChangeText={value => this.onChangeText('expiryDate', value)}
                                            placeholder={mowStrings.placeholder.expiryDate}
                                            type={"number"}/>

                                        {/* cvc input */}
                                        <MowInput
                                            rightIconOnPress={() => {}}
                                            rightIcon={"help-circle"}
                                            containerStyle={{flex: 1, marginLeft: wp("5%"), paddingRight: wp("4%")}}
                                            iconColor={"#b6babe"}
                                            onChangeText={value => this.onChangeText('cvc', value)}
                                            placeholder={mowStrings.placeholder.cvc}
                                            type={"number"}/>

                                    </View>

                                </View>
                        }

                    </View>

                    {/* paypal view */}
                    <View
                        style={[paymentStyle.container, {flexDirection: "row", marginTop: 10, paddingVertical: 10, backgroundColor: mowColors.viewBGColor}]}>

                        <MowCheckBox
                            onPress={() => {this.setState({creditCard: false, paypal: true})}}
                            checkedColor={mowColors.mainColor}
                            checked={this.state.paypal}
                            containerStyle={checkBoxStyle.container}/>

                        {/* paypal logo image */}
                        <Image
                            style={[paymentStyle.logo, {width: wp("15%")}]}
                            source={require("../../../assets/logo/paypal.png")}
                            resizeMode={"contain"}/>

                    </View>

                </KeyboardAwareScrollView>

                <View
                    style={{width: "90%", alignSelf: "center"}}>

                    {/* complete payment button */}
                    <MowButtonBasic
                        onPress={() => {this.props.navigation.navigate("CompleteOrder")}}
                        size={"medium"}
                        type={"success"}>

                        {mowStrings.button.completePayment}

                    </MowButtonBasic>

                </View>

            </MowContainer>

        )

    }

}

const paymentStyle = ({
    container: {
        width: "100%",
        ...borderStyle,
        alignItems: "center",
    },
    titleText: {
        color: mowColors.titleTextColor
    },
    logoView: {
        backgroundColor: "#ffffff",
        ...borderStyle,
        padding: 5,
        marginVertical: 5
    },
    logo: {
        width: wp("10%"),
        height: hp("3%")
    }
});

const checkBoxStyle = ({
    container: {
        alignSelf: "center",
        marginHorizontal: wp("3%")
    }
});