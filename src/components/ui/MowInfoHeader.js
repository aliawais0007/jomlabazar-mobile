import React from "react";
import PropTypes from 'prop-types';
import {View, Text} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {mowStrings} from "../../values/Strings/MowStrings";
import {mowColors} from "../../values/Colors/MowColors";

export class MowInfoHeader extends React.Component {

    static propTypes = {
        activeIndex: PropTypes.oneOf([1, 2, 3])
    };

    static defaultProps = {
        activeIndex: 0
    };

    render() {

        return(

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: hp("1%"),
                    backgroundColor: mowColors.viewBGColor
                }}>

                {/* delivery information view */}
                <View
                    style={textView.view}>

                    <Text
                        style={[textView.text, {color: this.props.activeIndex === 1 ? mowColors.mainColor : mowColors.textColor}]}>

                        1 {"\n"}
                        {mowStrings.infoHeader.deliverInformation}

                    </Text>

                </View>

                {/* right icon */}
                <FAIcon
                    style={[iconView.icon, {color: this.props.activeIndex === 1 ? mowColors.mainColor : mowColors.textColor}]}
                    name={"chevron-right"}/>

                {/* payment information view */}
                <View
                    style={textView.view}>

                    <Text
                        style={[textView.text, {color: this.props.activeIndex === 2 ? mowColors.mainColor : mowColors.textColor}]}>

                        2 {"\n"}
                        {mowStrings.infoHeader.paymentInformation}

                    </Text>

                </View>

                {/* right icon */}
                <FAIcon
                    style={[iconView.icon, {color: this.props.activeIndex === 2 ? mowColors.mainColor : mowColors.textColor}]}
                    name={"chevron-right"}/>

                {/* completing order view */}
                <View
                    style={textView.view}>

                    <Text
                        style={[textView.text, {color: this.props.activeIndex === 3 ? mowColors.mainColor : mowColors.textColor}]}>

                        3 {"\n"}
                        {mowStrings.infoHeader.completingOrder}

                    </Text>

                </View>

            </View>

        )

    }
}

const textView = ({
    view: {
        flex: 1
    },
    text: {
        fontSize: hp("1.8%"),
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 18,
        letterSpacing: 0,
        textAlign: "left",
        marginLeft: wp("5%")
    }
});

const iconView = ({
    icon: {
        fontSize: hp("2.5%")
    }
});