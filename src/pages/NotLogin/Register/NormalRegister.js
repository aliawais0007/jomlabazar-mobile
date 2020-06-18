import React from "react";
import { Text, View, Image } from "react-native";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { pageContainerStyle } from "../../../values/Styles/MowStyles";
import { mowColors } from "../../../values/Colors/MowColors";
import MowForwardBack from "../../../components/ui/Core/Navbar/MowForwardBack";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { _errorDialog } from "../../../components/ui/Common/Dialog/MowDialogFunctions";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { API_ROOT } from "../../../values/Constants/MowConstants";

export default class NormalRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmPassword: "",
      email: "",
      password: "",
    };
  }

  // to store entered regular from user
  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  validateForm = () => {
    const { email, password, confirmPassword } = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === true) {
      if (password !== "") {
        if (password === confirmPassword) {
          return true;
        } else {
          _errorDialog("Error","Password Not Matched");
          return false;
        }
      } else _errorDialog("Error","Password is Empty");
      return false;
    } else {
      _errorDialog("Error","Invalid Email Address");
    }
  };

  signUp = async () => {
    if (this.validateForm()) {
      const { email, password, confirmPassword } = this.state;
      let formData = new FormData();
      formData.append("aaa_email", email);
      formData.append("aaa_password", password);
      formData.append("aaa_cpassword", confirmPassword);
      let initObject = {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      };

      try {
        fetch(API_ROOT + "JomlahBazar/AdminPanel/controllers/CON_Register_AAA.php"
        , initObject
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else throw response.json();
          })
          .then((data) => {
            switch (data) {
              case 0:
                this.setState({ email: "", password: "", confirmPassword: "" });
                /*Success*/
                /*Simulate an HTTP redirect:*/
                navigation.navigate("HomeScreen");
                break;
              case 1:
                /*Error*/
                  _errorDialog(
                    "Warning",
                    "This account is already registered. Please try different email!"
                  );
                  this.setState({ email: "", password: "", confirmPassword: "" });
                break;
              case 2:
                /*Error*/
                  _errorDialog(
                    "Error",
                    "Missing required parameters. Please try again."
                  );
                break;
              case 3:
                /*Error*/
                  _errorDialog(
                    "Error",
                    "Missing required parameters. Please try again."
                  );
                break;
              default:
                _errorDialog("Error", "No case found. Please contact support.");
            }
          });
      } catch (err) {
        alert(err);
      }
    }
  };

  render() {
    return (
      <MowContainer
        footer={false}
        hideStatusBar={true}
        navbar={false}
        style={{ backgroundColor: mowColors.transparent }}
      >

            {/* home screen navbar */}
            <View
          style={[
            {
              padding: 3,
              margin:0,
              height:50,
              backgroundColor: mowColors.mainColor,
              flexDirection: "row",
              justifyContent:"center",
              alignItems:"center"
            },
          ]}
        >

          {/* logo with text */}
          <Image
            source={require("../../../assets/logo/logo_with_text_colorful.png")}
            style={{ height: hp("6%"), width:"30%",}}
            resizeMode={"contain"}
            />
        </View>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={pageContainerStyle}
        >
          {/* top navigation button area */}
          <MowForwardBack
            leftOnPress={() => this.props.navigation.goBack()}
            left={true}
          />

          <Text
            style={{
              fontWeight: "400",
              color: "black",
              fontSize: hp(3),
              marginBottom: hp("1%"),
              marginTop: hp("3%"),
              marginLeft: 15,
            }}
          >
            Welcome
          </Text>
          <View
            style={{
              ...pageContainerStyle,
              margin: 10,
              backgroundColor: "white",
              padding: 15,
            }}
          >
            <Text
              style={{
                fontSize: hp(3),
                fontWeight: "600",
                fontStyle: "normal",
                textAlign: "center",
                color: "black",
                marginBottom: 10,
              }}
            >
              {mowStrings.signUp}
            </Text>

            {/* name view */}
            <View style={inputStyle.container}>
              <Text style={inputStyle.titleText}>{"Email"}</Text>

              <MowInput
                iconColor={"black"}
                rightIcon={"check"}
                containerStyle={inputStyle.inputContainer}
                textInputStyle={inputStyle.inputText}
                value={this.state.email}
                onChangeText={(value) => this.onChangeText("email", value)}
              />
            </View>

            {/* username view */}
            <View style={inputStyle.container}>
              <Text style={inputStyle.titleText}>{"Password"}</Text>

              <MowInput
                iconColor={"black"}
                rightIcon={"eye"}
                passwordInput={true}
                containerStyle={inputStyle.inputContainer}
                textInputStyle={inputStyle.inputText}
                value={this.state.password}
                onChangeText={(value) => this.onChangeText("password", value)}
              />
            </View>

            {/* password view */}
            <View style={inputStyle.container}>
              {/* title regular */}
              <Text style={inputStyle.titleText}>{"Confirm Password"}</Text>

              <MowInput
                containerStyle={inputStyle.inputContainer}
                textInputStyle={inputStyle.inputText}
                value={this.state.confirmPassword}
                onChangeText={(value) =>
                  this.onChangeText("confirmPassword", value)
                }
                passwordInput={true}
                iconColor={"black"}
                rightIcon={"eye"}
              />
            </View>

            <MowButtonBasic
              onPress={() => {
                this.signUp();
              }}
              style={{ marginTop: hp("1%") }}
              containerStyle={{
                marginTop: hp("1%"),
                backgroundColor: mowColors.successColor,
              }}
              textStyle={{
                color: "white",
                fontWeight: "normal",
                letterSpacing: 0,
              }}
              type={"default"}
            >
              {mowStrings.button.createAnAccount}
            </MowButtonBasic>
          </View>
        </KeyboardAwareScrollView>
      </MowContainer>
    );
  }
}

export const inputStyle = {
  container: {
    marginVertical: 10,
  },
  titleText: {
    fontSize: hp("2%"),
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "black",
    opacity: 0.8,
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
  },
  inputText: {
    fontSize: hp("2%"),
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "grey",
    width: "85%",
  },
};
