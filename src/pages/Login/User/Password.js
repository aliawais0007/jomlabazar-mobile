import React from "react";
import {Text, View} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {MowInput} from "../../../components/ui/Common/Input/MowInput";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";

export default class Password extends React.Component {

    state = {
        currentPassword: "",
        newPassword: "",
        newPassword2: ""
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
                title={mowStrings.passwordPage.title}>

                <View
                    style={pageContainerStyle}>

                    <View
                        style={inputStyle.container}>

                        {/* currentPassword title regular */}
                        <Text
                            style={[inputStyle.titleText, {color: mowColors.titleTextColor}]}>

                            {mowStrings.placeholder.currentPassword}

                        </Text>

                        {/* currentPassword input */}
                        <MowInput
                            leftIcon={"lock"}
                            type={"text"}
                            passwordInput={true}
                            containerStyle={{backgroundColor: mowColors.viewBGColor, width: "100%"}}
                            textInputStyle={{color: mowColors.textColor}}
                            value={this.state.currentPassword}
                            onChangeText={value => this.onChangeText('currentPassword', value)}/>

                    </View>

                    <View
                        style={inputStyle.container}>

                        {/* newPassword title regular */}
                        <Text
                            style={[inputStyle.titleText, {color: mowColors.titleTextColor}]}>

                            {mowStrings.placeholder.newPassword}

                        </Text>

                        {/* newPassword input */}
                        <MowInput
                            passwordInput={true}
                            leftIcon={"lock"}
                            type={"text"}
                            containerStyle={{backgroundColor: mowColors.viewBGColor, width: "100%"}}
                            textInputStyle={{color: mowColors.textColor}}
                            value={this.state.newPassword}
                            onChangeText={value => this.onChangeText('newPassword', value)}/>

                    </View>

                    <View
                        style={inputStyle.container}>

                        {/* newPassword2 title regular */}
                        <Text
                            style={[inputStyle.titleText, {color: mowColors.titleTextColor}]}>

                            {mowStrings.placeholder.newPassword2}

                        </Text>

                        {/* newPassword2 input */}
                        <MowInput
                            passwordInput={true}
                            leftIcon={"lock"}
                            type={"text"}
                            containerStyle={{backgroundColor: mowColors.viewBGColor, width: "100%"}}
                            textInputStyle={{color: mowColors.textColor}}
                            value={this.state.newPassword2}
                            onChangeText={value => this.onChangeText('newPassword2', value)}/>

                    </View>

                </View>

                <View
                    style={{width: "90%", alignSelf: "center"}}>

                    <MowButtonBasic
                        onPress={() => {}}
                        type={"success"}>

                        {mowStrings.button.update}

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
    },

});