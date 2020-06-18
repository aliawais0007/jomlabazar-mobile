import React from "react";
import {Text, View} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {fontFamily, pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MowInput} from "../../../components/ui/Common/Input/MowInput";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";

export default class Feedback extends React.Component {

    state = {
        fullName: "Bianca Watkins",
        email: "biancawatkins@gmail.com",
        title: "About product types",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
                title={mowStrings.feedback.title}>

                <View
                    style={pageContainerStyle}>

                    {/* user information input view */}
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        style={{marginTop: hp("2%")}}>

                        <View
                            style={inputStyle.container}>

                            {/* fullName title regular */}
                            <Text
                                style={[inputStyle.titleText, {color: mowColors.titleTextColor}]}>

                                {mowStrings.placeholder.fullName}

                            </Text>

                            {/* fullName input */}
                            <MowInput
                                leftIcon={"user"}
                                type={"text"}
                                containerStyle={{width: "100%", backgroundColor: mowColors.viewBGColor}}
                                textInputStyle={{color: mowColors.textColor}}
                                value={this.state.fullName}
                                onChangeText={value => this.onChangeText('fullName', value)}/>

                        </View>

                        <View
                            style={inputStyle.container}>

                            {/* email title regular */}
                            <Text
                                style={[inputStyle.titleText, {color: mowColors.titleTextColor}]}>

                                {mowStrings.placeholder.email}

                            </Text>

                            {/* email input */}
                            <MowInput
                                leftIcon={"mail"}
                                type={"text"}
                                containerStyle={{width: "100%", backgroundColor: mowColors.viewBGColor}}
                                textInputStyle={{color: mowColors.textColor}}
                                value={this.state.email}
                                onChangeText={value => this.onChangeText('email', value)}/>

                        </View>

                        <View
                            style={inputStyle.container}>

                            {/* fullName title regular */}
                            <Text
                                style={[inputStyle.titleText, {color: mowColors.titleTextColor}]}>

                                {mowStrings.placeholder.feedbackTitle}

                            </Text>

                            {/* title input */}
                            <MowInput
                                leftIcon={"message-square"}
                                type={"text"}
                                containerStyle={{width: "100%", backgroundColor: mowColors.viewBGColor}}
                                textInputStyle={{color: mowColors.textColor}}
                                value={this.state.title}
                                onChangeText={value => this.onChangeText('title', value)}/>

                        </View>

                        <View
                            style={inputStyle.container}>

                            {/* message title */}
                            <Text
                                style={inputStyle.titleText}>

                                {mowStrings.placeholder.feedbackComment}

                            </Text>

                            {/* message input */}
                            <MowInput
                                type={"textarea"}
                                containerStyle={{
                                    width: "100%",
                                    height: hp("15%"),
                                    backgroundColor: mowColors.viewBGColor
                                }}
                                textInputStyle={{
                                    fontSize: hp("1.8%"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    fontFamily: fontFamily.regular,
                                    textAlign: "left",
                                    color: mowColors.textColor,
                                    width: "100%",
                                    paddingBottom: 10
                                }}
                                value={this.state.message}
                                onChangeText={value => this.onChangeText('message', value)}/>

                        </View>

                    </KeyboardAwareScrollView>

                    <MowButtonBasic
                        type={"success"}>

                        {mowStrings.button.send}

                    </MowButtonBasic>

                </View>

            </MowContainer>

        )

    }

}

const inputStyle = ({
    container: {
        marginVertical: 5,
    },
    titleText: {
        fontSize: hp("1.8%"),
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        fontFamily: fontFamily.medium
    }
});