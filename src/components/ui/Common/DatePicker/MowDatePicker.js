import DatePicker from "react-native-datepicker";
import React from "react";
import PropTypes from 'prop-types';
import {TextInput, View, Text} from "react-native";
import {mowColors} from "../../../../values/Colors/MowColors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export default class MowDatePicker extends React.Component {

    static propTypes = {
        defaultValue: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.defaultValue,
            display: "none",
            focusStyle: {
                borderColor: "grey",
                borderBottomWidth: 1
            }
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {

        window.setTimeout(() => {

            if (this.props.defaultValue || this.props.defaultValue === "") {
                this.setState({
                    value: this.props.defaultValue,
                    date: this.props.defaultValue,
                })
            }

            if (this.props.value) {

                this.setState({
                    date: this.props.value,
                    display: "flex"

                });
            } else {
                // this.setState({
                //     display: "none"
                // });
            }
        }, 50)

    }

    focus() {
        /**
         * open datepicker with code
         **/
        this.datePicker.onPressDate();

        this.setState({
            focusStyle: {
                borderColor: mowColors.mainColor,
                borderBottomWidth: 1,

            }
        })
    }

    render() {

        return (

            <View>

                <DatePicker
                    style={{height: 0, width: 0}}
                    date={this.state.date}
                    locale={"en"}
                    mode="date"
                    ref={ref => this.datePicker = ref}
                    showIcon={false}
                    format="YYYY-MM-DD"
                    confirmBtnText="Choose"
                    cancelBtnText="Cancel"
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
                                borderColor: "grey",
                                borderBottomWidth: 1,
                            }
                        });
                    }}
                    onDateChange={(date) => {
                        this.setState({date: date});
                        this.setState({value: date, display: "flex"});
                        this.ref.setNativeProps({text: date});
                        /**
                         * Dışarde çekebilmek için önemli
                         */
                        this.ref._lastNativeText = date;
                        if (this.props.onChange) {

                            this.props.onChange(this.ref);
                        }
                    }}
                />

                <View>

                    <Text
                        style={{paddingHorizontal: 10, display: this.state.display, fontSize: hp("1.8%")}}>

                        {this.props.placeholder}

                    </Text>

                    <TextInput
                        ref={ref => this.ref = ref}
                        value={this.state.value}
                        placeholderTextColor={"#575757"}
                        onFocus={() => this.focus(true)}
                        style={[this.state.focusStyle, { flexDirection: "row",
                            marginBottom: 15,
                            height: hp("5.5%"),
                            backgroundColor: "white",
                            borderRadius: 10,
                            width: "100%",
                            alignItems: "center",
                            padding: 10,
                            fontSize: hp("1.8%"),
                            justifyContent: "center",
                            alignSelf: "center"}]}
                        {...this.props} />

                </View>

            </View>
        )
    }
}


