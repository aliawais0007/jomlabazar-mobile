import React from "react";
import {TouchableOpacity, Text,View} from "react-native";
import PropTypes from 'prop-types';
import FAIcon from "react-native-vector-icons/FontAwesome";
import {mowStrings} from "../../../../values/Strings/MowStrings";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export default class MowForwardBack extends React.Component {

    static propTypes = {
        left: PropTypes.bool,
        right: PropTypes.bool,
        leftOnPress: PropTypes.func,
        rightOnPress: PropTypes.func
    };

    render() {

        return (

            <View
                style={{flexDirection: "row", alignItems: "center"}}>
                {
                    this.props.left &&

                    // back button
                    <TouchableOpacity
                        onPress={() => this.props.leftOnPress()}
                        style={navButton.touchable}>

                        <FAIcon
                            style={navButton.icon}
                            name={"angle-left"}/>

                        <Text
                            style={navButton.text}>

                            {mowStrings.button.back}

                        </Text>

                    </TouchableOpacity>
                }

                {
                    this.props.right &&

                    // forward button
                    <TouchableOpacity
                        onPress={() => this.props.rightOnPress()}
                        style={[navButton.touchable, {justifyContent: "flex-end", width: !this.props.left ? "100%" : "50%"}]}>

                        <Text
                            style={navButton.text}>

                            {mowStrings._forward}

                        </Text>

                        <FAIcon
                            style={navButton.icon}
                            name={"angle-right"}/>

                    </TouchableOpacity>
                }


            </View>

        );

    }

}

export const navButton = {
    touchable: {
        marginTop: 20,
        width: "50%",
        alignItems: "center",
        flexDirection: "row",
    },
    icon: {
        color: "black",
        fontSize: hp("3%"),
        marginLeft: 10
    },
    text: {
        marginLeft: 10,
        color: "black",
        fontSize: hp("2%"),
        fontWeight: "500"
    }
};