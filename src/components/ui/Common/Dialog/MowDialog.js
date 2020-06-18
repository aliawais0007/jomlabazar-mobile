import React, { Component } from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import FAIcon from "react-native-vector-icons/FontAwesome";
import {Dialog, SlideAnimation} from 'react-native-popup-dialog';
import {deviceWidth} from "../../../../values/Constants/MowConstants";
import {mowColors} from "../../../../values/Colors/MowColors";
import {shadowStyle} from "../../../../values/Styles/MowStyles";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

const dialogType = {
    DEFAULT: "default",
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning"
};

export default class MowDialog extends Component {

    _isMounted = false;
    
    styles = {
        iconView: {
            justifyContent: "center",
            alignItems: "center",
            bottom: -45,
            zIndex: 99999999999,
            backgroundColor: mowColors.viewBGColor,
            width: hp("10%"),
            height: hp("10%"),
            alignSelf: "center",
            borderRadius: 100,
            borderWidth: 10,
            borderColor: mowColors.viewBGColor
        },
        image: {
            width: hp("7%"),
            height: hp("7%"),
        },
        icon: {
            width: hp("3%"),
            height: hp("3%"),
            color: "white",
            fontSize: hp("3%"),
            textAlign: "center"
        },
        contentMainParentView: {
            height: hp("30%"),
            bottom: 0,
        },
        contentMainView: {
            height: hp("23%"),
            backgroundColor: mowColors.viewBGColor,
            borderRadius: 30,
            paddingTop: 25
        },
        contentView: {
            height: "65%",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 30
        },
        title: {
            fontSize: hp("1.8"),
            textAlign: "center",
            marginTop: hp(1),
            color: mowColors.mainColor,
            fontWeight: "600"
        },
        message: {
            fontSize: hp("1.8%"),
            textAlign: "center",
            marginTop: 10,
            lineHeight: 20,
            color: mowColors.textColor,
            fontWeight: "400"
        },
        buttonViewMain: {
            flexDirection: "row",
            height: "35%",
            justifyContent: "center",
            alignItems: "center"
        },
        buttonTouchable: {
            borderRadius: 10,
            height: "60%",
            justifyContent: "center"
        },
        buttonText: {
            alignSelf: "center",
            color: "white",
            fontSize: hp("2.5%"),
            fontWeight: "500",
            textAlign: "center"
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    constructor(props)
    {
        super(props);

        global.__dialogThis = this;

        this.state = {
            showDialog: false,
            title: "",
            message: "",
            twoButton: false,
            dialogType: "default",
            bpt: "",
            bnt: ""
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    showDialog(flag){
        this.setState({showDialog: flag})
    }

    // to reign dialog this
    componentWillReceiveProps(nextProps, nextContext) {
        global.__dialogThis = this;
    }

    _buttonPositiveClick() {
        if (typeof this.state.buttonPositive == 'function')
        {
            this.state.buttonPositive();
        }
        this.showDialog(false)
    }

    _buttonNegativeClick() {
        if (typeof this.state.buttonNegative() == 'function')
        {
            this.state.buttonNegative();
        }
        this.showDialog(false)
    }

    // dialog button ui
    _buttonView(buttonColor) {

        return (

            <View
                style={[this.styles.buttonViewMain, {paddingHorizontal: this.state.twoButton ? 30 : 90}]}>

                {/* positive button touchable */}
                <TouchableOpacity
                    onPress={() => {this._buttonPositiveClick()}}
                    style={[shadowStyle, {flex: 1, marginRight: this.state.twoButton ? 10 : 0, borderRadius: 10, backgroundColor: buttonColor}]}>

                    <View
                        style={[this.styles.buttonTouchable]}>

                        {/* positive button text */}
                        <Text
                            style={this.styles.buttonText}>

                            {this.state.bpt}

                        </Text>

                    </View>

                </TouchableOpacity>

                {
                    this.state.twoButton &&

                    //negative button touchable
                    <TouchableOpacity
                        onPress={() => {this._buttonNegativeClick()}}
                        style={[shadowStyle, {flex: 1, marginLeft: 10, borderRadius: 10, backgroundColor: buttonColor}]}>

                        <View
                            style={[this.styles.buttonTouchable]}>

                            {/* negative button text */}
                            <Text
                                style={this.styles.buttonText}>

                                {this.state.bnt}

                            </Text>

                        </View>

                    </TouchableOpacity>
                }

            </View>

        );

    }

    //default dialog header
    _default() {

        return (

            <View>

                {/* dialog image */}
                <View
                    style={this.styles.iconView}>

                    <Image
                        resizeMode={"contain"}
                        style={this.styles.image}
                        source={require("../../../../assets/logo/logo.png")}/>

                </View>

                <View
                    style={this.styles.contentMainParentView}>

                    {/* dialog message view */}
                    <View
                        style={this.styles.contentMainView}>

                        <View
                            style={this.styles.contentView}>

                            {/* title text */}
                            <Text
                                style={this.styles.title}>

                                {this.state.title}

                            </Text>

                            {/* message text */}
                            <Text
                                style={this.styles.message}>

                                {this.state.message}

                            </Text>

                        </View>

                        {this._buttonView(mowColors.mainColor)}

                    </View>

                </View>

            </View>

        );
    }

    // success dialog
    _success() {
        return (

            <View>

                {/* dialog icon view  */}
                <View
                    style={[this.styles.iconView, {
                        backgroundColor: mowColors.successColor,
                        borderWidth: 10
                    }]}>

                    {/* dialog icon */}
                    <FAIcon
                        style={this.styles.icon}
                        name={"check"}/>

                </View>

                <View
                    style={this.styles.contentMainParentView}>

                    {/* dialog message view */}
                    <View
                        style={this.styles.contentMainView}>

                        <View
                            style={this.styles.contentView}>

                            {/* title text */}
                            <Text
                                style={[this.styles.title, {
                                    fontSize: hp("3"),
                                    color: mowColors.successColor
                                }]}>

                                {this.state.title}

                            </Text>

                            {/* message text */}
                            <Text
                                style={this.styles.message}>

                                {this.state.message}

                            </Text>

                        </View>

                        {this._buttonView(mowColors.successColor)}

                    </View>

                </View>

            </View>

        );
    }

    _error() {
        return (

            <View>

                {/* dialog icon view */}
                <View
                    style={[this.styles.iconView, {
                        backgroundColor: mowColors.errorColor,
                        borderWidth: 10
                    }]}>

                    {/* dialog icon */}
                    <FAIcon
                        style={this.styles.icon}
                        name={"times"}/>

                </View>

                <View
                    style={this.styles.contentMainParentView}>

                    {/* dialog message view */}
                    <View
                        style={this.styles.contentMainView}>

                        <View
                            style={this.styles.contentView}>

                            {/* title text */}
                            <Text
                                style={[this.styles.title, {
                                    fontSize: hp("3"),
                                    color: mowColors.errorColor
                                }]}>

                                {this.state.title}

                            </Text>

                            {/* message text */}
                            <Text
                                style={this.styles.message}>

                                {this.state.message}

                            </Text>

                        </View>

                        {this._buttonView(mowColors.errorColor)}

                    </View>

                </View>

            </View>

        );
    }

    // warning dialog
    _warning() {
        return (

            <View>

                {/* dialog icon view  */}
                <View
                    style={[this.styles.iconView, {
                        backgroundColor: mowColors.warningColor,
                        borderWidth: 10
                    }]}>

                    {/* dialog icon */}
                    <FAIcon
                        style={this.styles.icon}
                        name={"exclamation"}/>

                </View>

                <View
                    style={this.styles.contentMainParentView}>

                    {/* dialog message view */}
                    <View
                        style={this.styles.contentMainView}>

                        <View
                            style={this.styles.contentView}>

                            {/* title text */}
                            <Text
                                style={[this.styles.title, {
                                    fontSize: hp("3"),
                                    color: mowColors.warningColor
                                }]}>

                                {this.state.title}

                            </Text>

                            {/* message text */}
                            <Text
                                style={this.styles.message}>

                                {this.state.message}

                            </Text>

                        </View>

                        {this._buttonView(mowColors.warningColor)}

                    </View>

                </View>

            </View>

        );
    }

    // dialog main container
    render()
    {
        if(this.state.showDialog !== false)
        {
            return (

                <Dialog
                    overlayBackgroundColor={"#454545"}
                    width={deviceWidth * 0.8}
                    visible={this.state.showDialog}
                    onTouchOutside={() => {
                        if (this.state.onTouchOutside)
                        {
                            this.showDialog(false);
                        }

                    }}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    dialogStyle={{zIndex: 999, backgroundColor:"transparent"}}>


                    {/* to detect dialog types here then render related dialog type */}
                    <View>

                        {
                            !this.state.dialogType &&
                            this._default()
                        }

                        {
                            this.state.dialogType === dialogType.DEFAULT &&
                            this._default()
                        }

                        {
                            this.state.dialogType === dialogType.SUCCESS &&
                            this._success()
                        }

                        {
                            this.state.dialogType === dialogType.ERROR &&
                            this._error()
                        }

                        {
                            this.state.dialogType === dialogType.WARNING &&
                            this._warning()
                        }

                    </View>


                </Dialog>

            )
        }

        return null;
    }
}