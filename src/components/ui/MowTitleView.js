import React from "react";
import PropTypes from 'prop-types';
import {View, Text} from "react-native";
import {mowStrings} from "../../values/Strings/MowStrings";
import {MowButtonBasic} from "./Common/Button/MowButton";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import FeatherIcon from "react-native-vector-icons/Feather";
import {mowColors} from "../../values/Colors/MowColors";

export class MowTitleView extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        buttonText: PropTypes.string,
        buttonOnPress: PropTypes.func,
        showButton: PropTypes.bool
    };

    static defaultProps = {
        buttonText: mowStrings.viewMore,
        title: "",
        showButton: true
    };

    render() {

        return(

            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    marginBottom: 15,
                }}>

                {/* title icon */}
                <FeatherIcon
                    name={"grid"}
                    style={{
                        fontSize: hp("3%"),
                        color: mowColors.titleIcon
                    }}/>

                {/* title text */}
                <Text
                    style={{
                        fontSize: hp("1.8%"),
                        fontWeight: "bold",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "left",
                        color: mowColors.titleTextColor,
                        marginLeft: 15
                    }}>

                    {this.props.title}

                </Text>

                {/* view more button */}
                {
                    this.props.showButton &&

                        <MowButtonBasic
                            onPress={() => {
                                if (typeof this.props.buttonOnPress == 'function')
                                {
                                    this.props.buttonOnPress();
                                }
                            }}
                            containerStyle={{
                                width: wp("28%"),
                                marginLeft: 15,
                                borderRadius: 156,
                                margin: 0,
                                borderColor: "rgba(190, 190, 190, 0.95)"
                            }}
                            textStyle={{
                                fontWeight: "400",
                                color: mowColors.textColor,
                                fontSize: hp("1.3%")
                            }}
                            shadow={false}
                            filled={false}
                            size={"xSmall"}>

                            {this.props.buttonText}

                        </MowButtonBasic>
                }

            </View>

        )

    }
}
