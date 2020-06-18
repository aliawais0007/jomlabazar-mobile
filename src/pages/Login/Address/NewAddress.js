import React from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {MowInput} from "../../../components/ui/Common/Input/MowInput";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {borderStyle, fontFamily, pageContainerStyle} from "../../../values/Styles/MowStyles";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {View} from "react-native";
import CountryList from "../../../sampleData/CountryList";
import {MowPicker} from "../../../components/ui/Common/Picker/MowPicker";
import CityList from "../../../sampleData/CityList";
import TownList from "../../../sampleData/TownList";

export default class NewAddress extends React.Component {

    /**
     *  these style values are here because of the color change.
     *  when changed the color, styles that are outside the class, are not re-rendered!
     */
    iconColor =  mowColors.mainColor;

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
            color: "#aeaeae"
        },
        buttonIcon: {
            color: mowColors.mainColor
        }
    };

    inputStyle = {
        container: {
            backgroundColor: mowColors.viewBGColor
        }
    };

    state = {
        name: "",
        surname: "",
        phone: "",
        countryId: null,
        country: "Country - 1",
        cityId: null,
        city: "City - 1",
        townId: null,
        town: "Town - 1",
        fullAddress: "",
        addressName: "",
        pickerData: [],
        pickerType: 0,
        pickerVisible: false,
        pickerTitle: ""
    };

    // to store entered regular from user
    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        })
    };

    /**
     *      type -->
     *              1: country
     *              2: city
     *              2: town
     * */
    _onSelect(selectedItem) {

        this.setState({pickerVisible: false});

        let type = this.state.pickerType;

        if (type === 1) {
            this.setState({country: selectedItem["title"]})
        }
        else if (type === 2){
            this.setState({city: selectedItem["title"]})
        }
        else if (type === 3) {
            this.setState({town: selectedItem["title"]})
        }

    }

    render() {

        return(

            <MowContainer
                title={mowStrings.button.addNewAddress}>

                <KeyboardAwareScrollView
                    style={pageContainerStyle}
                    showsVerticalScrollIndicator={false}>

                    {/* name input */}
                    <MowInput
                        containerStyle={this.inputStyle.container}
                        onChangeText={value => this.onChangeText('name', value)}
                        placeholder={mowStrings.placeholder.name}
                        iconColor={this.iconColor}
                        leftIcon={"user"}
                        type={"text"}/>

                    {/* surname input */}
                    <MowInput
                        containerStyle={this.inputStyle.container}
                        onChangeText={value => this.onChangeText('surname', value)}
                        placeholder={mowStrings.placeholder.surname}
                        iconColor={this.iconColor}
                        leftIcon={"user"}
                        type={"text"}/>

                    {/* phone input */}
                    <MowInput
                        containerStyle={this.inputStyle.container}
                        onChangeText={value => this.onChangeText('phone', value)}
                        placeholder={mowStrings.placeholder.phone}
                        iconColor={this.iconColor}
                        leftIcon={"phone"}
                        type={"number"}/>

                    {/* address title input */}
                    <MowInput
                        containerStyle={this.inputStyle.container}
                        onChangeText={value => this.onChangeText('addressTitle', value)}
                        placeholder={mowStrings.placeholder.addressName}
                        iconColor={this.iconColor}
                        leftIcon={"navigation"}
                        type={"text"}/>

                    {/* country picker */}
                    <View
                        style={this.pickerStyle.container}>

                        {/* country picker button */}
                        <MowButtonBasic
                            onPress={() => {this.setState({pickerData: CountryList, pickerVisible: true, pickerType: 1, pickerTitle: mowStrings.placeholder.country})}}
                            leftIcon={"globe"}
                            leftIconStyle={this.pickerStyle.buttonIcon}
                            textStyle={this.pickerStyle.buttonText}
                            containerStyle={this.pickerStyle.button}>

                            {this.state.country}

                        </MowButtonBasic>

                    </View>

                    {/* city picker */}
                    <View
                        style={this.pickerStyle.container}>

                        {/* city picker button */}
                        <MowButtonBasic
                            onPress={() => {this.setState({pickerData: CityList, pickerVisible: true, pickerType: 2, pickerTitle: mowStrings.placeholder.city})}}
                            leftIcon={"globe"}
                            leftIconStyle={this.pickerStyle.buttonIcon}
                            textStyle={this.pickerStyle.buttonText}
                            containerStyle={this.pickerStyle.button}>

                            {this.state.city}

                        </MowButtonBasic>

                    </View>

                    {/* town picker */}
                    <View
                        style={this.pickerStyle.container}>

                        {/* town picker button */}
                        <MowButtonBasic
                            onPress={() => {this.setState({pickerData: TownList, pickerVisible: true, pickerType: 3, pickerTitle: mowStrings.placeholder.town})}}
                            leftIcon={"globe"}
                            leftIconStyle={this.pickerStyle.buttonIcon}
                            textStyle={this.pickerStyle.buttonText}
                            containerStyle={this.pickerStyle.button}>

                            {this.state.town}

                        </MowButtonBasic>

                    </View>

                    <MowInput
                        containerStyle={this.inputStyle.container}
                        onChangeText={value => this.onChangeText('fullAddress', value)}
                        placeholder={mowStrings.placeholder.fullAddress}
                        iconColor={this.iconColor}
                        leftIcon={"navigation"}
                        type={"textarea"}/>

                </KeyboardAwareScrollView>

                <View
                    style={{marginHorizontal: wp("3%")}}>

                    {/* save address button */}
                    <MowButtonBasic
                        onPress={() => {this.props.navigation.navigate("AddressList")}}
                        size={"medium"}
                        type={"success"}>

                        {mowStrings.button.saveAddress}

                    </MowButtonBasic>

                </View>

                <MowPicker
                    pickerTitle={this.state.pickerTitle}
                    search={false}
                    data={this.state.pickerData}
                    onSelect={(obj) => {this._onSelect(obj)}}
                    modalVisible={this.state.pickerVisible}/>

            </MowContainer>

        )

    }

}