import React from "react";
import {Text, View} from "react-native";
import MowForwardBack from "../../../../components/ui/Core/Navbar/MowForwardBack";
import {pageContainerStyle} from "../../../../values/Styles/MowStyles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {mowColors} from "../../../../values/Colors/MowColors";
import MowContainer from "../../../../components/ui/Core/Container/MowContainer";
import {mowStrings} from "../../../../values/Strings/MowStrings";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MowInput} from "../../../../components/ui/Common/Input/MowInput";
import {MowButtonBasic} from "../../../../components/ui/Common/Button/MowButton";
import { API_ROOT } from "../../../../values/Constants/MowConstants";
import { _errorDialog } from "../../../../components/ui/Common/Dialog/MowDialogFunctions";

export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
        }
    }

    // to store entered regular from user
    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        })
    };
    validate = () => {
        const { email } = this.state;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === true) {
          return true;
        } else {
          _errorDialog("Invalid Email", "Please Enter a Valid Email Address");
          return false;
        }
      };

      _handleForgotPassword=()=> {
        const { email } = this.state;
        const URL =
          API_ROOT + "JomlahBazar/AdminPanel/controllers/CON_Login_AAA.php";
        if (this.validate()) {
          let formData = new FormData();
          formData.append("aaa_email", email);
          alert("Forgot");
          this.props.navigation.navigate("ExtraSecurity")
        }
    }

    render() {

        return (

            <MowContainer
                footer={false}
                hideStatusBar={true}
                navbar={false}
                style={{backgroundColor: mowColors.transparent}}>

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
                                color: "black",
                                marginBottom: hp(5)
                            }}>

                            {mowStrings.forgotPasswordScreen.title}

                        </Text>

                        {/* email view */}
                        <View
                            style={{...pageContainerStyle, marginVertical: 10}}>

                            {/* email title text */}
                            <Text
                                style={{
                                    fontSize: hp("2%"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: "black"
                                }}>

                                {mowStrings.placeholder.email}*

                            </Text>

                            {/* email input */}
                            <MowInput
                                containerStyle={{
                                    backgroundColor: "transparent",
                                    orderStyle: "solid",
                                    borderWidth: 1,
                                    borderColor: "black",
                                    width: "100%"
                                }}
                                textInputStyle={{
                                    fontSize: hp("2.2%"),
                                    fontWeight: "500",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: "grey",
                                    width: "85%"
                                }}
                                onChangeText={value => this.onChangeText("email", value)}/>

                        </View>

                        <MowButtonBasic
                            onPress={()=>this._handleForgotPassword()}
                            style={{marginTop: hp("3%")}}
                            containerStyle={{marginTop: hp("5%"),marginTop: hp("1%"), backgroundColor: mowColors.successColor, width:"95%"}}
                            textStyle={{color: "white", fontWeight: "normal", letterSpacing: 0}}
                            type={"default"}>

                            {mowStrings.button.submit}

                        </MowButtonBasic>

                    </View>

                </KeyboardAwareScrollView>

            </MowContainer>
        )
    }

}