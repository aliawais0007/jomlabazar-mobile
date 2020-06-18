import React from "react";
import {Text, View} from "react-native";
import MowForwardBack from "../../../../components/ui/Core/Navbar/MowForwardBack";
import {pageContainerStyle} from "../../../../values/Styles/MowStyles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {mowColors} from "../../../../values/Colors/MowColors";
import MowContainer from "../../../../components/ui/Core/Container/MowContainer";
import {mowStrings} from "../../../../values/Strings/MowStrings";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {MowInput} from "../../../../components/ui/Common/Input/MowInput";
import FeatherIcon from "react-native-vector-icons/Feather";
import {MowButtonBasic} from "../../../../components/ui/Common/Button/MowButton";

export default class ExtraSecurity extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            securityCode1: null,
            securityCode2: null,
            securityCode3: null,
            securityCode4: null,
            securityCode5: null,
        }
    }

    // to store entered regular from user
    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        })
    };

    render() {

        return (

            <MowContainer
                footer={false}
                hideStatusBar={true}
                navbar={false}
                style={{backgroundColor: mowColors.mainColor}}>

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={pageContainerStyle}>

                    {/* top navigation button area */}
                    <MowForwardBack
                        leftOnPress={() => this.props.navigation.goBack()}
                        left={true}/>

                    <View
                        style={{...pageContainerStyle, marginTop: hp("3%")}}>

                        <Text
                            style={{
                                fontSize: hp(3),
                                fontWeight: "600",
                                fontStyle: "normal",
                                textAlign: "center",
                                color: "#ffffff",
                                marginBottom: hp(5)
                            }}>

                            {mowStrings.extraSecurity.title}

                        </Text>

                        {/* info text */}
                        <Text
                            style={{
                                color: "white",
                                textAlign: "center",
                                fontSize: hp(1.8),
                                marginBottom: hp(3)
                            }}>

                            {mowStrings.extraSecurity.infoMessage}

                        </Text>

                        {/* validation code input area */}
                        <View
                            style={{flexDirection: "row"}}>

                            <MowInput
                                maxLength={1}
                                textInputStyle={securityCodeStyle.textInput}
                                onChangeText={value => this.onChangeText("securityCode1", value)}
                                containerStyle={securityCodeStyle.input}/>

                            <MowInput
                                maxLength={1}
                                textInputStyle={securityCodeStyle.textInput}
                                onChangeText={value => this.onChangeText("securityCode2", value)}
                                containerStyle={securityCodeStyle.input}/>

                            <MowInput
                                maxLength={1}
                                textInputStyle={securityCodeStyle.textInput}
                                onChangeText={value => this.onChangeText("securityCode3", value)}
                                containerStyle={securityCodeStyle.input}/>

                            <MowInput
                                maxLength={1}
                                textInputStyle={securityCodeStyle.textInput}
                                onChangeText={value => this.onChangeText("securityCode4", value)}
                                containerStyle={securityCodeStyle.input}/>

                            <MowInput
                                maxLength={1}
                                textInputStyle={securityCodeStyle.textInput}
                                onChangeText={value => this.onChangeText("securityCode5", value)}
                                containerStyle={securityCodeStyle.input}/>

                        </View>

                        {/* time view */}
                        <View
                            style={{flexDirection: "row", marginVertical: hp(3), marginHorizontal: wp(3), alignItems: "center"}}>

                            <FeatherIcon
                                style={{color: "white", fontSize: hp(3)}}
                                name={"clock"}/>

                            <Text
                                style={{
                                    marginLeft: 10,
                                    color: "white",
                                    fontSize: hp(1.8)
                                }}>

                                {mowStrings.extraSecurity.timeRemaining}: 180 sec.

                            </Text>

                        </View>

                        <MowButtonBasic
                            onPress={() => this.props.navigation.navigate("ChangePassword")}
                            textStyle={{color: mowColors.mainColor, fontWeight: "normal", letterSpacing: 0}}
                            type={"default"}>

                            {mowStrings.button.submit}

                        </MowButtonBasic>

                        {/* no verification code view */}
                        <View
                            style={{marginTop: hp(3)}}>

                            {/* no verification code text */}
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: hp(1.8),
                                    textAlign: "center"
                                }}>

                                {mowStrings.extraSecurity.noVerificationCode}

                            </Text>

                            {/* send again button */}
                            <MowButtonBasic
                                containerStyle={{borderWidth: 0}}
                                filled={false}
                                type={"default"}>

                                {mowStrings.button.sendAgain}

                            </MowButtonBasic>

                        </View>

                    </View>

                </KeyboardAwareScrollView>

            </MowContainer>
        )
    }

}

const securityCodeStyle = ({
    input: {
        borderBottomWidth: 0,
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: 40,
        justifyContent: "center"
    },
    textInput: {
        textAlign: "center",
        alignSelf: "center",
        color: mowColors.mainColor
    }
});