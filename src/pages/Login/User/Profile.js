import React from "react";
import {View, Image, Text} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {borderStyle, fontFamily, pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {MowInput} from "../../../components/ui/Common/Input/MowInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {MowPicker} from "../../../components/ui/Common/Picker/MowPicker";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import Gender from "../../../sampleData/Gender";
import Language from "../../../sampleData/Language";

export default class Profile extends React.Component {

    /**
     *  these style values are here because of the color change.
     *  when changed the color, styles that are outside the class, are not re-rendered!
     */

    inputStyle = {
        container: {
            marginVertical: 5,
        },
        titleText: {
            fontSize: hp("1.8%"),
            fontWeight: "600",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            color: mowColors.titleTextColor,
            fontFamily: fontFamily.medium
        },
        inputContainer: {
            width: "100%",
            backgroundColor: mowColors.viewBGColor
        },
        inputText: {
            fontSize: hp("1.8%"),
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            fontFamily: fontFamily.regular,
            textAlign: "left",
            color: mowColors.textColor
        }
    };

    pickerStyle = {
        container: {
            marginVertical: 5,
        },
        button: {
            ...borderStyle,
            backgroundColor: mowColors.viewBGColor
        },
        buttonText: {
            width: "63%",
            fontSize: hp("1.8%"),
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            fontFamily: fontFamily.regular,
            color: mowColors.textColor
        },
        buttonIcon: {
            color: mowColors.mainColor
        }
    };

    state = {
        fullName: "Bianca Watkins",
        username: "bianca.watkins",
        email: "biancawatkins@gmail.com",
        birthday: "1998-08-21",
        phone: "XXX XXX XX XX",
        genderPicker: false,
        languagePicker: false,
        pickerData: [],
        pickerType: 0,
        pickerVisible: false,
        gender: "Female",
        language: "English"
    };

    // to store entered regular from user
    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        })
    };

    /**
     *      type -->
     *              1: gender
     *              2: language
     * */
    _onSelect(selectedItem) {

        this.setState({pickerVisible: false});

        let type = this.state.pickerType;

        if (type === 1) {
            this.setState({gender: selectedItem["title"], pickerSelectedId: selectedItem["id"]})
        }
        else if (type === 2){
            this.setState({language: selectedItem["title"], pickerSelectedId: selectedItem["id"]})
        }

    }

    render() {

        return(

            <MowContainer
                title={mowStrings.profilePage.title}>

                <View
                    style={[pageContainerStyle, {marginTop: hp("3%"), marginHorizontal: wp("7%")}]}>

                    <View
                        style={{flexDirection: "row"}}>

                        <Image
                            style={{width: hp("8%"), height: hp("8%"), alignSelf: "center"}}
                            resizeMode={"contain"}
                            source={require("../../../assets/image/guest.png")}/>

                        {/* name, email view */}
                        <View
                            style={{justifyContent: "center", marginLeft: 20}}>

                            <Text
                                style={{
                                    fontSize: hp("2%"),
                                    fontWeight: "600",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: mowColors.titleTextColor,
                                    fontFamily: fontFamily.medium
                                }}>

                                Bianca Watkins

                            </Text>

                            <Text
                                style={{
                                    fontSize: hp("1.8%"),
                                    fontWeight: "400",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    fontFamily: fontFamily.medium,
                                    color: mowColors.titleTextColor
                                }}>

                                biancawatkins@gmail.com

                            </Text>

                        </View>

                    </View>

                    {/* user information input view */}
                    <KeyboardAwareScrollView
                        showsVerticalScrollIndicator={false}
                        style={{marginTop: hp("2%"), marginBottom: hp("7%")}}>

                        <View
                            style={this.inputStyle.container}>

                            {/* fullName title regular */}
                            <Text
                                style={this.inputStyle.titleText}>

                                {mowStrings.placeholder.fullName}

                            </Text>

                            {/* fullName input */}
                            <MowInput
                                leftIcon={"user"}
                                type={"text"}
                                containerStyle={this.inputStyle.inputContainer}
                                textInputStyle={this.inputStyle.inputText}
                                value={this.state.fullName}
                                onChangeText={value => this.onChangeText('fullName', value)}/>

                        </View>

                        <View
                            style={this.inputStyle.container}>

                            {/* username title regular */}
                            <Text
                                style={this.inputStyle.titleText}>

                                {mowStrings.placeholder.username}

                            </Text>

                            {/* username input */}
                            <MowInput
                                leftIcon={"user"}
                                type={"text"}
                                containerStyle={this.inputStyle.inputContainer}
                                textInputStyle={this.inputStyle.inputText}
                                value={this.state.username}
                                onChangeText={value => this.onChangeText('username', value)}/>

                        </View>

                        <View
                            style={this.inputStyle.container}>

                            {/* email title regular */}
                            <Text
                                style={this.inputStyle.titleText}>

                                {mowStrings.placeholder.email}

                            </Text>

                            {/* email input */}
                            <MowInput
                                leftIcon={"mail"}
                                type={"text"}
                                containerStyle={this.inputStyle.inputContainer}
                                textInputStyle={this.inputStyle.inputText}
                                value={this.state.email}
                                onChangeText={value => this.onChangeText('email', value)}/>

                        </View>

                        <View
                            style={this.inputStyle.container}>

                            {/* gender title regular */}
                            <Text
                                style={this.inputStyle.titleText}>

                                {mowStrings.placeholder.gender}

                            </Text>

                            {/* gender picker button */}
                            <MowButtonBasic
                                onPress={() => {this.setState({pickerData: Gender, pickerVisible: true, pickerType: 1})}}
                                leftIcon={"user"}
                                leftIconStyle={this.pickerStyle.buttonIcon}
                                textStyle={this.pickerStyle.buttonText}
                                containerStyle={this.pickerStyle.button}>

                                {this.state.gender}

                            </MowButtonBasic>

                        </View>

                        <View
                            style={this.inputStyle.container}>

                            {/* language title regular */}
                            <Text
                                style={this.inputStyle.titleText}>

                                {mowStrings.placeholder.gender}

                            </Text>

                            {/* language picker button */}
                            <MowButtonBasic
                                onPress={() => {this.setState({pickerData: Language, pickerVisible: true, pickerType: 2})}}
                                leftIcon={"globe"}
                                leftIconStyle={this.pickerStyle.buttonIcon}
                                textStyle={this.pickerStyle.buttonText}
                                containerStyle={this.pickerStyle.button}>

                                {this.state.language}

                            </MowButtonBasic>

                        </View>

                        <View
                            style={this.inputStyle.container}>

                            {/* phone title regular */}
                            <Text
                                style={this.inputStyle.titleText}>

                                {mowStrings.placeholder.phone}

                            </Text>

                            {/* phone input */}
                            <MowInput
                                leftIcon={"phone"}
                                type={"text"}
                                containerStyle={this.inputStyle.inputContainer}
                                textInputStyle={this.inputStyle.inputText}
                                value={this.state.phone}
                                onChangeText={value => this.onChangeText('phone', value)}/>

                        </View>

                    </KeyboardAwareScrollView>

                    <MowButtonBasic
                        containerStyle={{position: "absolute", bottom: 0, alignSelf: "center"}}
                        onPress={() => {}}
                        type={"success"}>

                        {mowStrings.button.save}

                    </MowButtonBasic>

                </View>

                <MowPicker
                    selectedValue={this.state.pickerSelectedId}
                    search={false}
                    data={this.state.pickerData}
                    onSelect={(obj) => {this._onSelect(obj)}}
                    modalVisible={this.state.pickerVisible}/>

            </MowContainer>

        )

    }

}