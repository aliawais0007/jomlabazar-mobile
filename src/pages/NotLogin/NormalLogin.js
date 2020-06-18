<script src="http://192.168.0.198:8097"></script>;
import React from "react";
import { Text, View, Image } from "react-native";
import MowContainer from "../../components/ui/Core/Container/MowContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { pageContainerStyle } from "../../values/Styles/MowStyles";
import MowForwardBack from "../../components/ui/Core/Navbar/MowForwardBack";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MowButtonBasic } from "../../components/ui/Common/Button/MowButton";
import { mowColors } from "../../values/Colors/MowColors";
import { mowStrings } from "../../values/Strings/MowStrings";
import { MowInput } from "../../components/ui/Common/Input/MowInput";
import { User } from "../../components/utils/User/User";
import { setLogin } from "../Router";
import { API_ROOT } from "../../values/Constants/MowConstants";
import { _errorDialog } from "../../components/ui/Common/Dialog/MowDialogFunctions";
import SyncStorage from "sync-storage";

let iconColor = "white";

export default class NormalLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      test:"",
       err:{},
       user:{},
       cartRedirect:false
    };
  }

  componentDidMount(){
    // if(this.props.navigation.state.params.cartRedirect){
    //   const cartRedirect = this.props.navigation.state.params.cartRedirect;
    //   if(cartRedirect){
    //   this.setState({
    //     cartRedirect
    //   })
    // }
    // }
  }

  // to store entered regular from user
  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
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

 async _handleLogin() {
    const { email, password } = this.state;
    const URL =
      API_ROOT + "JomlahBazar/AdminPanel/controllers/CON_Login_AAA.php";
    if (this.validate()) {
      let formData = new FormData();
      formData.append("aaa_email", email);
      formData.append("aaa_password", password);
      let initObject = {
        method: "post",
        body: formData,
      };
      fetch(URL, initObject)
        .then((response) => {
          if (response.ok) {
            return response.json();
            
          } else throw response.json();
        })
        .then((data) => {
          switch (parseInt(data.err)) {
            case 0:
                SyncStorage.set('email', email);
                SyncStorage.set('uid', data.uid);
                this.setState({ email: "", password: ""});

                this.checkLocalCart(data.uid);
                this.checkLocalWishList(data.uid)
                // to update user login situation
                  new User().setLogin(true);
                  // to change router
                  setLogin(true);
                  /*Success*/
              break;
            case 1:
              /*Error*/
                _errorDialog(
                  "Warning",
                  "Account is not activated yet! please check your email."
                );
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
              _errorDialog("Error", "Something went wrong. Please contact support.");
          }
        })
        .catch((err) => {
        // _errorDialog("Failed", "Login was not successful. Please try again.")
        });
    }
  }

  checkLocalCart = async(uid) => {
    let cartItems = SyncStorage.get('cartItems');
    let wishList = SyncStorage.get('wishList');
    cartItems = JSON.parse(cartItems);
    wishList = JSON.parse(wishList);
    if(cartItems.length > 0 )
    {
      cartItems.map((item, index)=>{
        this._saveLoacalCart(uid, item.productId, cartItems.length, index);
      })
    }
    
  }

  checkLocalWishList = async(uid) =>{
    let wishList = SyncStorage.get('wishList');
    wishList = JSON.parse(wishList);    
    if(wishList.length > 0){
      wishList.map((item, index)=>{
        this._saveLoacalWishList(uid, item.productId, wishList.length, index);
      })
    }
  }


  _saveLoacalCart=async(uid, productId, length, index)=>{
    let API = API_ROOT+'JomlahBazar/AdminPanel/controllers/client/CON_Add_Cart.php?';
    API = API + `userId=${uid}&productId=${productId}`;
    fetch(API)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        else throw response.json();
    })
    .then(responseJson=>{
        switch (responseJson) {
            case 0:
               // Empty the local cart if Saved to DB
              if(index+1==length){
                SyncStorage.set('cartItems','[]');
              }
                _showToast.success(mowStrings.productAdded);
              break;
            case 1:
              // Empty the local cart if already in DB 
              if(index+1==length){
                SyncStorage.set('cartItems','[]');
              }
              /*Error*/
              /*similate 2s delay*/
              setTimeout(function () {
                _errorDialog(
                  "Error",
                  "Product already existed in cart"
                );
              }, 2000);
              break;
            case 2:
              /*Error*/
              /*similate 2s delay*/
              setTimeout(function () {
                _errorDialog(
                  "Error",
                  "Missing required parameters. Please try again."
                );
              }, 2000);
              break;
            case 3:
              /*Error*/
              /*similate 2s delay*/
              setTimeout(function () {
                _errorDialog(
                  "Error",
                  "Missing required parameters. Please try again."
                );
              }, 2000);
              break;
            default:
              _errorDialog("Error", "Can't add product to cart. Please contact support.");
          }
    })
  }


  _saveLoacalWishList=async(uid, productId, length, index)=>{
    let API = API_ROOT+'JomlahBazar/AdminPanel/controllers/client/CON_Add_Wishlist.php?';
    API = API + `userId=${uid}&productId=${productId}`;
    fetch(API)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        else throw response.json();
    })
    .then(responseJson=>{
        switch (responseJson) {
            case 0:
              if(index+1==length){
                SyncStorage.set('wishList','[]');
              }
                _showToast.success("Wish List added");
              break;
            case 1:
              if(index+1==length){
                SyncStorage.set('wishList','[]');
              }
              /*Error*/
              /*similate 2s delay*/
              setTimeout(function () {
                _errorDialog(
                  "Error",
                  "Product already existed in favourite"
                );
              }, 2000);
              break;
            case 2:
              /*Error*/
              /*similate 2s delay*/
              setTimeout(function () {
                _errorDialog(
                  "Error",
                  "Missing required parameters. Please try again."
                );
              }, 2000);
              break;
            case 3:
              /*Error*/
              /*similate 2s delay*/
              setTimeout(function () {
                _errorDialog(
                  "Error",
                  "Missing required parameters. Please try again."
                );
              }, 2000);
              break;
            default:
              _errorDialog("Error", "Can't add product to favourite. Please contact support.");
          }
    })
  }
  render() {
    return (
      <MowContainer
        footer={false}
        hideStatusBar={true}
        navbar={false}
        style={{ backgroundColor: mowColors.tranparent }}
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
            source={require("../../assets/logo/logo_with_text_colorful.png")}
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

          <Text style={{ fontWeight:"400", color:"black", fontSize: hp(3),marginBottom: hp("1%"), marginTop: hp("3%"), marginLeft:15}}>
            Welcome
          </Text>
          <View style={{ ...pageContainerStyle, margin:10, backgroundColor:"white", padding:15 }}>
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
              {mowStrings.login}
            </Text>

            {/* username view */}
            <View style={inputStyle.container}>
              <Text style={inputStyle.titleText}>
                {"Email"}
              </Text>

              <MowInput
                iconColor={"black"}
                rightIcon={"check"}
                containerStyle={inputStyle.inputContainer}
                textInputStyle={inputStyle.inputText}
                value={this.state.email}
                onChangeText={(value) => this.onChangeText("email", value)}
              />
            </View>

            {/* password view */}
            <View style={inputStyle.container}>
              {/* title regular */}
              <Text style={inputStyle.titleText}>
                {mowStrings.loginPage.password}
              </Text>

              <MowInput
                containerStyle={inputStyle.inputContainer}
                textInputStyle={inputStyle.inputText}
                value={this.state.password}
                onChangeText={(value) => this.onChangeText("password", value)}
                passwordInput={true}
                iconColor={"black"}
                rightIcon={"eye"}
              />
            </View>

<View style={{ }}>
            <MowButtonBasic
              onPress={() => {
                this._handleLogin();
              }}
              style={{ marginTop: hp("1%") }}
              containerStyle={{ marginTop: hp("1%"),backgroundColor:mowColors.successColor, }}
              textStyle={{
                color: "white",
                fontWeight: "normal",
                letterSpacing: 0,
              }}
              type={"default"}
            >
              {mowStrings.login}
            </MowButtonBasic>
            </View>

            {/* Signup view */}
            <View style={{ marginTop: 0 }}>
              <Text
                style={{
                  color: "black",
                  fontSize: hp(1.8),
                  textAlign: "center",
                }}
              >
                {"Don't have account? Sign up here!"}
              </Text>

              {/* Signup button */}
              <MowButtonBasic
                onPress={() => {
                  this.props.navigation.navigate("NormalRegister");
                }}
                containerStyle={{ borderWidth: 0, backgroundColor:mowColors.successColor, color:"white"}}
                textStyle={{
                  color: "white",
                  fontWeight: "normal",
                  letterSpacing: 0,
                }}
                filled={false}
                type={"default"}
              >
                {"Sign up"}
              </MowButtonBasic>
            </View>
         

            {/* forgot password view */}
            <View style={{ marginTop: 0}}>
              <Text
                style={{
                  color: "black",
                  fontSize: hp(1.8),
                  textAlign: "center",
                }}
              >
                {mowStrings.loginPage.cantAccessAccount}
              </Text>

              {/* forgot password button */}
              <MowButtonBasic
                onPress={() => {
                  this.props.navigation.navigate("ForgotPassword");
                }}
                containerStyle={{ borderWidth: 0, backgroundColor:mowColors.successColor, color:"black"}}
                textStyle={{
                  color: "white",
                  fontWeight: "normal",
                  letterSpacing: 0,
                }}
                filled={false}
                type={"default"}
              >
                {mowStrings.loginPage.forgotPassword}
              </MowButtonBasic>
            </View>
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
    borderColor:"black",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ffffff",
    width: "100%",
  },
  inputText: {
    fontSize: hp("2.2%"),
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "grey",
    width: "85%",
  },
};
