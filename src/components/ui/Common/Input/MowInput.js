import React from "react";
import PropTypes from 'prop-types';
import {TextInput, TouchableOpacity, View} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {mowColors} from "../../../../values/Colors/MowColors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import DatePicker from "react-native-datepicker";
import {platform} from "../../../../values/Constants/MowConstants";

class MowInputBase extends React.Component {

    static propTypes = {
        ...TextInput.props,
        type: PropTypes.oneOf(['password', 'text', 'textarea', "number"]),
        passwordInput: PropTypes.bool,
        textInputStyle: PropTypes.object,
        keyboardType: PropTypes.string
    };

    static defaultProps = {
        keyboardType: null
    };

    state = {
        multiline: false,
        keyboardType: "default"
    };

    textInputRef = null;

    constructor(props) {
        super(props);

        this.state.multiline = false;
        if (this.props.type == "textarea") {
            this.state.multiline = true;
        } else if (this.props.type == "number") {
            this.state.keyboardType = "number-pad";
        }
    }

    render() {

        return (

            <TextInput
                ref={ref => this.textInputRef = ref}
                {...this.props}
                multiline={this.state.multiline}
                numberOfLines={4}
                editable
                value={this.props.value ? this.props.value.toString() : this.props.value}
                keyboardType={this.state.keyboardType}
                style={{
                    width: "70%",
                    height: "100%",
                    margin: 0,
                    padding: 0,
                    paddingHorizontal: 10,
                    fontSize: hp("1.8%"),
                    color: mowColors.textColor,
                    ...this.props.textInputStyle
                }}
                placeholder={this.props.placeholder}
                placeholderTextColor={"#c1bdbd"}
            />

        );

    }

}

export class MowInput extends React.Component {

    static propTypes = {
        ...MowInputBase.props,
        type: PropTypes.oneOf(['password', 'text', 'textarea', "number"]),
        passwordInput: PropTypes.bool,
        leftIcon: PropTypes.string,
        rightIcon: PropTypes.string,
        rightIconOnPress: PropTypes.func,
        iconColor: PropTypes.string,
        containerStyle: PropTypes.object,
        textInputStyle: PropTypes.object,
        placeholder: PropTypes.string
    };

    state = {
        hiddenPassword: true,
        rightIcon: "",
        leftIcon: "",
        iconColor: mowColors.mainColor,
        inputWidth: "100%"
    };

    myInputRef = null;
    textInputRef = null;

    constructor(props) {
        super(props);

        /**
         *Eğer şifre alanı değilse bu input ozman password gizlemelerini devre dışı bırakıyoruz
         */
        if (!this.props.passwordInput) {

            this.state = {
                hiddenPassword: false,
                rightIcon: this.props.rightIcon,
                leftIcon: this.props.leftIcon
            }
        } else {
            this.state.rightIcon = "eye";
            this.state.leftIcon = this.props.leftIcon || null;
        }

        if (this.state.rightIcon && this.state.leftIcon) {
            this.state.inputWidth = "70%";
        } else if (this.state.leftIcon || this.state.rightIcon) {
            this.state.inputWidth = "85%";

        } else {
            this.state.inputWidth = "100%";
        }

        this.textInputStyle = {
            width: this.state.inputWidth
        };
        this.textAreaStyle = {};

        if (this.props.type == "textarea") {
            this.textInputStyle.height = 100;//textarea input height
            this.textAreaStyle.height = 100;//textarea view height
            this.textAreaStyle.paddingTop = platform === "android" ? 0 : 20;//textarea view padding
        }
    }

    _togglePasswordVisibility() {
        if (this.props.passwordInput) {

            if (this.state.hiddenPassword) {
                this.setState({
                    hiddenPassword: false,
                    rightIcon: "eye-off",
                })
            } else {
                this.setState({
                    hiddenPassword: true,
                    rightIcon: "eye"
                })
            }
        }

        if (this.props.rightIconOnPress && typeof this.props.rightIconOnPress == "function") {
            this.props.rightIconOnPress();
        }

    }


    componentDidMount() {
        this.textInputRef = this.myInputRef.textInputRef;
    }

    render() {

        return (

            <View
                style={[{
                    flexDirection: "row",
                    marginVertical: 10,
                    height: hp("5.5%"),
                    backgroundColor: "white",
                    borderRadius: 5,
                    alignSelf: "center",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "rgba(112, 112, 112, 0.16)"
                }, this.textAreaStyle, {...this.props.containerStyle}]}>

                {
                    this.state.leftIcon &&

                    <View
                        style={{
                            width: "15%",
                            alignSelf: "center",
                        }}>

                        <FeatherIcon
                            style={{
                                textAlign: "center",
                                fontSize: hp("2.5%"),
                                color: this.props.iconColor || mowColors.mainColor,
                            }}
                            name={this.state.leftIcon}/>

                    </View>
                }

                <MowInputBase
                    ref={ref => this.myInputRef = ref}
                    textInputStyle={this.textInputStyle}
                    secureTextEntry={this.state.hiddenPassword}
                    {...this.props}/>

                {
                    this.state.rightIcon &&

                    <TouchableOpacity
                        style={{
                            width: "15%",
                            alignSelf: "center",
                        }}
                        onPress={() => this._togglePasswordVisibility()}>

                        <FeatherIcon
                            style={{
                                textAlign: "center",
                                fontSize: hp("2.5%"),
                                color: this.props.iconColor || mowColors.mainColor,
                            }}
                            name={this.state.rightIcon}/>

                    </TouchableOpacity>
                }

            </View>

        );

    }
}

export class MowDatepicker extends React.Component {

    static propTypes = {
        ...MowInputBase.props,
        type: PropTypes.oneOf(['password', 'text', 'textarea']),
        passwordInput: PropTypes.bool,
        leftIcon: PropTypes.string,
        rightIcon: PropTypes.string,
        rightIconOnPress: PropTypes.func,
        iconColor: PropTypes.string,
        containerStyle: PropTypes.object,
        textInputStyle: PropTypes.object,
        onChange: PropTypes.func
    };

    state = {
        date: ""
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({date: nextProps.value || ""})
    }

    datePicker = null;

    render() {
        return (

            <View>
                <DatePicker
                    style={{height: 0, width: 0}}
                    date={this.state.date}
                    locale={"tr"}
                    mode="date"
                    ref={ref => this.datePicker = ref}
                    showIcon={false}
                    format="YYYY-MM-DD"
                    confirmBtnText="Seç"
                    cancelBtnText="İptal"
                    customStyles={{
                        dateInput: {
                            height: 0,
                            width: 0,
                            fontSize: 0,
                            display: "none",
                            borderWidth: 0,
                        }
                    }}
                    onCloseModal={() => {
                        this.setState({
                            focusStyle: {
                                borderBottomWidth: 1,
                            }
                        });
                    }}
                    onDateChange={(date) => {
                        let textInputRef = this.ref.textInputRef;
                        this.setState({date: date});
                        this.setState({value: date, display: "flex"});
                        textInputRef.setNativeProps({text: date});
                        /**
                         * Dışarde çekebilmek için önemli
                         */
                        textInputRef._lastNativeText = date;
                        if (this.props.onChange) {

                            this.props.onChange(date, textInputRef);
                        }
                    }}
                />

                <MowInput
                    ref={ref => this.ref = ref}
                    {...this.props}
                    onFocus={() => {
                        /**
                         * Datepicker kod ile açmak
                         **/
                        this.datePicker.onPressDate()
                    }}/>

            </View>

        )
    }
}
