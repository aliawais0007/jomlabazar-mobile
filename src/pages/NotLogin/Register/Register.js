import React from "react";
import MyContainer from "../../../components/ui/Core/Container/MowContainer";
import {mowColors} from "../../../values/Colors/MowColors";
import {Text, View, Image} from "react-native";
import {pageContainerStyle} from "../../../values/Styles/MowStyles";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {mowStrings} from "../../../values/Strings/MowStrings";
import MowForwardBack from "../../../components/ui/Core/Navbar/MowForwardBack";

export default class Register extends React.Component {

    render() {

        return (

            <MyContainer
                footer={false}
                navbar={false}
                statusBar={true}
                style={{backgroundColor: mowColors.mainColor}}>

                {/* top navigation button area */}
                <MowForwardBack
                    leftOnPress={() => this.props.navigation.goBack()}
                    left={true}/>

                <View
                    style={pageContainerStyle}>

                    <Text
                        style={{
                            marginVertical: hp("2%"),
                            fontSize: hp("3%"),
                            fontWeight: "bold",
                            fontStyle: "normal",
                            lineHeight: 53,
                            letterSpacing: 0,
                            textAlign: "center",
                            color: "#ffffff"
                        }}>

                        {mowStrings.signUp}

                    </Text>

                    {/* button view */}
                    <View
                        style={{marginVertical: hp("1%")}}>

                        {/* sign in with email button */}
                        <MowButtonBasic
                            onPress={() => {this.props.navigation.navigate("NormalRegister")}}
                            size={"big"}
                            containerStyle={buttonStyle.container}
                            textStyle={buttonStyle.text}
                            leftIcon={"mail"}
                            type={"success"}>

                            {mowStrings.signUpPage.withEmail}

                        </MowButtonBasic>

                        {/* line view */}
                        <View
                            style={{flexDirection: "row", marginVertical: hp("3%"), alignItems: "center"}}>

                            {/* left line view */}
                            <View
                                style={{
                                    borderStyle: "solid",
                                    borderWidth: 1.5,
                                    borderColor: "#ffffff",
                                    height: 1,
                                    flex: 2
                                }}/>


                            <Text
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                    fontSize: hp("3%"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    color: "#ffffff"
                                }}>

                                {mowStrings.or}

                            </Text>

                            {/* right line view */}
                            <View
                                style={{
                                    borderStyle: "solid",
                                    borderWidth: 1.5,
                                    borderColor: "#ffffff",
                                    flex: 2,
                                    height: 1
                                }}/>

                        </View>

                        {/* sign in with facebook button */}
                        <MowButtonBasic
                            size={"big"}
                            containerStyle={buttonStyle.container}
                            textStyle={buttonStyle.text}
                            leftIcon={"facebook"}
                            type={"success"}>

                            {mowStrings.signUpPage.withFacebook}

                        </MowButtonBasic>

                        {/* sign in with google button */}
                        <MowButtonBasic
                            size={"big"}
                            containerStyle={buttonStyle.container}
                            textStyle={buttonStyle.text}
                            leftIcon={"globe"}
                            type={"success"}>

                            {mowStrings.signUpPage.withGoogle}

                        </MowButtonBasic>

                    </View>

                    <Text
                        style={{
                            marginTop: hp("2%"),
                            fontSize: hp("1.8%"),
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: "#ffffff"
                        }}>

                        {mowStrings.signUpPage.haveAccount}

                    </Text>

                    <MowButtonBasic
                        onPress={() => {this.props.navigation.navigate("NormalLogin")}}
                        type={"success"}>

                        {mowStrings.login}

                    </MowButtonBasic>

                    <Text
                        style={{
                            marginTop: hp("3%"),
                            fontSize: hp("2%"),
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: "#ffffff"
                        }}>

                        {mowStrings.signUpPage.usageTerms}

                    </Text>

                </View>

                {/* logo */}
                <Image
                    resizeMode={"contain"}
                    style={{
                        marginBottom: hp("5%"),
                        alignSelf: "center",
                        width: wp("60%"),
                        height: hp("4%")
                    }}
                    source={require("../../../assets/logo/logo_with_text.png")}/>

            </MyContainer>

        );
    }
}

const buttonStyle = ({
    container: {
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#ffffff"
    },
    text: {
        fontSize: hp("2%"),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff"
    }
});
