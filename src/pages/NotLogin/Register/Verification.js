import React from "react";
import {View, Image, Text} from "react-native";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {pageContainerStyle} from "../../../values/Styles/MowStyles";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {MowInput} from "../../../components/ui/Common/Input/MowInput";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {User} from "../../../components/utils/User/User";
import {setLogin} from "../../Router";

export default class Verification extends React.Component {

    state = {
        step: 1
    };

    _handleLogin() {
        // to update user login situation
        new User().setLogin(true);
        // to change router
        setLogin(true);
    }

    // to move forward to the next input when user touched the next
    _nextInput(refName) {
        this.refs[refName].textInputRef.focus();
    }

    render() {

        return(

            <MowContainer
                footer={false}
                navbar={false}
                style={{backgroundColor: mowColors.mainColor}}>

                <View
                    style={[pageContainerStyle]}>

                    {/* check icon */}
                    <Image
                        style={{
                            alignSelf: "center",
                            marginTop: hp("5%"),
                            height: hp("10%"),
                            width: hp("10%"),
                        }}
                        resizeMode={"contain"}
                        source={require("../../../assets/icon/ic_check.png")}/>

                    {
                        this.state.step === 1 &&

                            <View>

                                {/* almost done text */}
                                <Text
                                    style={{
                                        marginTop: hp("3%"),
                                        fontSize: hp("2.5%"),
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "center",
                                        color: "#ffffff"
                                    }}>

                                    {mowStrings.signUpPage.almostDone}

                                </Text>

                                {/* security code text */}
                                <Text
                                    style={{
                                        marginTop: hp("2%"),
                                        fontSize: hp("1.8%"),
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        lineHeight: 28,
                                        letterSpacing: 0,
                                        textAlign: "center",
                                        color: "#ffffff"
                                    }}>

                                    {mowStrings.signUpPage.securityCodeMessage}

                                </Text>

                                {/* verification code info text */}
                                <Text
                                    style={{
                                        marginTop: hp("5%"),
                                        fontSize: hp("1.8%"),
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        lineHeight: 38,
                                        letterSpacing: 0,
                                        textAlign: "center",
                                        color: "#ffffff"
                                    }}>

                                    {mowStrings.signUpPage.verificationCodeMessage}

                                </Text>

                                {/* code input view */}
                                <View
                                    style={{flexDirection: "row"}}>

                                    <MowInput
                                        ref={"input1"}
                                        onSubmitEditing={(a) => {this._nextInput("input2")}}
                                        maxLength={1}
                                        type={"number"}
                                        textInputStyle={codeInput.text}
                                        containerStyle={codeInput.container}/>

                                    <MowInput
                                        ref={"input2"}
                                        onSubmitEditing={(a) => {this._nextInput("input3")}}
                                        returnKeyType='next'
                                        maxLength={1}
                                        type={"number"}
                                        textInputStyle={codeInput.text}
                                        containerStyle={codeInput.container}/>

                                    <MowInput
                                        ref={"input3"}
                                        onSubmitEditing={(a) => {this._nextInput("input4")}}
                                        returnKeyType='next'
                                        maxLength={1}
                                        type={"number"}
                                        textInputStyle={codeInput.text}
                                        containerStyle={codeInput.container}/>

                                    <MowInput
                                        ref={"input4"}
                                        onSubmitEditing={(a) => {this._nextInput("input5")}}
                                        returnKeyType='next'
                                        maxLength={1}
                                        type={"number"}
                                        textInputStyle={codeInput.text}
                                        containerStyle={codeInput.container}/>

                                    <MowInput
                                        ref={"input5"}
                                        returnKeyType={"done"}
                                        maxLength={1}
                                        type={"number"}
                                        textInputStyle={codeInput.text}
                                        containerStyle={codeInput.container}/>

                                </View>

                                {/* no verification code text */}
                                <Text
                                    style={{
                                        marginTop: hp("3%"),
                                        fontSize: hp("1.8%"),
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "center",
                                        color: "#ffffff"
                                    }}>

                                    {mowStrings.signUpPage.codeError}

                                </Text>

                                {/* re-send button */}
                                <MowButtonBasic
                                    type={"success"}>

                                    {mowStrings.button.sendAgain}

                                </MowButtonBasic>

                                {/* approve button */}
                                <MowButtonBasic
                                    onPress={() => {this.setState({step: 2})}}
                                    containerStyle={{marginTop: hp("5%")}}
                                    textStyle={{color: mowColors.mainColor}}
                                    type={"default"}>

                                    {mowStrings.button.approve}

                                </MowButtonBasic>

                            </View>
                    }

                    {
                        this.state.step === 2 &&

                            <View>

                                <Text
                                    style={{
                                        marginVertical: hp("5%"),
                                        fontSize: hp("2.2%"),
                                        fontWeight: "normal",
                                        fontStyle: "normal",
                                        lineHeight: 38,
                                        letterSpacing: 0,
                                        textAlign: "center",
                                        color: "#ffffff"
                                    }}>

                                    {mowStrings.signUpPage.congratsMessage}

                                </Text>

                                <MowButtonBasic
                                    onPress={() => {this._handleLogin()}}
                                    textStyle={{color: mowColors.mainColor}}
                                    type={"default"}>

                                    {mowStrings.button.continue}

                                </MowButtonBasic>

                            </View>
                    }

                </View>

            </MowContainer>

        )

    }

}

const codeInput = ({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        width: "100%",
        marginHorizontal: 10
    },
    text: {
        textAlign: "center",
        margin: 0,
        padding: 0,
        width: "100%",
        color: mowColors.mainColor
    }
});