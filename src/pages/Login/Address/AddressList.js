import React from "react";
import {FlatList, Text, View, TouchableOpacity} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import Address from "../../../sampleData/Address";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {borderStyle, categoryStyleWithoutShadow} from "../../../values/Styles/MowStyles";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {_successDialog, _warningDialog} from "../../../components/ui/Common/Dialog/MowDialogFunctions";
import {MowInfoHeader} from "../../../components/ui/MowInfoHeader";
import {MowCheckBox} from "../../../components/ui/Common/CheckBox/MowCheckBox";

export default class Settings extends React.Component {

    state = {
        checkBoxArr:[],
        addressSelected: false,
        addressListKey: 0,
        cart: this.props.navigation.getParam("cart")
    };

    _handleAddressSelection(index, item) {
        let checkBoxArr = this.state.checkBoxArr;

        let length = Address.length;

        for (let i = 0; i < length; i++) {
            if (i != index) {
                // to set false all array values except selected index
                checkBoxArr[i] = false;
            }
        }

        // to update selected item as its opposite
        checkBoxArr[index] = !checkBoxArr[index];

        this.setState({checkBoxArr: checkBoxArr, addressSelected: checkBoxArr[index], addressListKey: this.state.addressListKey + 1});
    }

    _goToPayment() {
        if (this.state.addressSelected) {
            this.props.navigation.navigate("PaymentInformation");
        }
        else {

            _warningDialog("Mowega", mowStrings.alertDialogs.addressSelection);

        }
    }

    render() {

        return(

            <MowContainer
                style={{backgroundColor: mowColors.pageBGDarkColor}}
                title={this.state.cart ? mowStrings.addressList.deliveryInformation : mowStrings.addressList.title}>

                {/* show the view if the navigation comes from cart */}
                {/* info header view */}
                {
                    this.state.cart &&

                        <MowInfoHeader
                            activeIndex={1}/>
                }

                {/* add new address button view */}
                <View
                    style={{
                        width: wp("45%"),
                        marginLeft: 10,
                        marginTop: 10
                    }}>

                    {/* add new address button */}
                    <MowButtonBasic
                        containerStyle={{marginVertical: 0}}
                        onPress={() => this.props.navigation.navigate("NewAddress")}
                        size={"xSmall"}
                        stickyIcon={true}
                        leftIcon={"plus"}
                        type={"success"}>

                        {mowStrings.button.addNewAddress}

                    </MowButtonBasic>

                </View>

                <FlatList
                    key={this.state.addressListKey}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={Address}
                    style={{marginTop: 10}}
                    renderItem={({ item, index }) => (

                        <TouchableOpacity
                            onPress={() => {this._handleAddressSelection(index, item)}}
                            key={index}
                            style={[categoryStyleWithoutShadow, {margin: 10, marginVertical: 7, flexDirection: "row", ...borderStyle, backgroundColor: mowColors.viewBGColor}]}>

                            {
                                this.state.cart &&

                                <MowCheckBox
                                    onPress={() => {this._handleAddressSelection(index, item)}}
                                    checkedColor={mowColors.mainColor}
                                    checked={this.state.checkBoxArr[index]}
                                    containerStyle={{marginRight: wp(5), alignSelf: "center"}}/>
                            }

                            <View
                                style={{right: wp(2)}}>

                                {/* title view */}
                                <Text
                                    style={{
                                        fontSize: hp("2%"),
                                        fontWeight: "500",
                                        fontStyle: "normal",
                                        letterSpacing: -0.01,
                                        textAlign: "left",
                                        color: mowColors.titleTextColor,
                                        width: "95%"
                                    }}>

                                    {item["title"]}

                                </Text>

                                {/* address view */}
                                <Text
                                    style={{
                                        marginVertical: 3,
                                        opacity: 0.72,
                                        fontSize: hp("1.8%"),
                                        fontWeight: "500",
                                        fontStyle: "normal",
                                        lineHeight: 20,
                                        letterSpacing: 0,
                                        textAlign: "left",
                                        color: mowColors.titleTextColor,
                                        width: "90%"
                                    }}>

                                    {item["fullAddress"]}

                                </Text>

                                <View
                                    style={{flexDirection: "row"}}>

                                    {/* name text */}
                                    <Text
                                        style={{
                                            fontSize: hp("1.7%"),
                                            opacity: 0.72,
                                            fontWeight: "500",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            textAlign: "left",
                                            color: mowColors.titleTextColor,
                                        }}>

                                        {item["name"]}

                                    </Text>

                                    {/* number text */}
                                    <Text
                                        style={{
                                            fontSize: hp("1.7%"),
                                            opacity: 0.72,
                                            fontWeight: "500",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            textAlign: "left",
                                            color: mowColors.titleTextColor,
                                            marginLeft: 20
                                        }}>

                                        {item["number"]}

                                    </Text>

                                </View>

                            </View>

                        </TouchableOpacity>

                    )}
                />

                {/* show the view if the navigation comes from cart */}
                {
                    this.state.cart &&

                        <View
                            style={{margin: 10}}>

                            <MowButtonBasic
                                onPress={() => {this._goToPayment()}}
                                type={"success"}>

                                {mowStrings.button.goToPayment}

                            </MowButtonBasic>

                        </View>
                }

            </MowContainer>

        )

    }

}
