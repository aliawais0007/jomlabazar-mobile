import React from "react";
import {View, Image, Text} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {shadowStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export default class ContactUs extends React.Component {

    infoStyle = {
        container: {
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 25,
            marginVertical: 10
        },
        icon: {
            color: mowColors.mainColor,
            fontSize: hp(3)
        },
        content: {
            color: mowColors.textColor,
            fontSize: hp(1.7),
            marginLeft: 10
        }
    };

    render() {

        return(

            <MowContainer
                title={mowStrings.drawerMenu.contactUs}>

                <View
                    style={{
                        backgroundColor: mowColors.viewBGColor,
                        paddingVertical: 20,
                        ...shadowStyle,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                    }}>

                    {/* info row view */}
                    <View
                        style={this.infoStyle.container}>

                        {/* info icon */}
                        <FeatherIcon
                            style={this.infoStyle.icon}
                            name={"mail"}/>

                        {/* content text */}
                        <Text
                            style={this.infoStyle.content}>

                            info@mowega.com

                        </Text>

                    </View>

                    {/* info row view */}
                    <View
                        style={this.infoStyle.container}>

                        {/* info icon */}
                        <FeatherIcon
                            style={this.infoStyle.icon}
                            name={"phone"}/>

                        {/* content text */}
                        <Text
                            style={this.infoStyle.content}>

                            +41 (547) 555 55 55

                        </Text>

                    </View>

                    {/* info row view */}
                    <View
                        style={this.infoStyle.container}>

                        {/* info icon */}
                        <FeatherIcon
                            style={this.infoStyle.icon}
                            name={"map"}/>

                        {/* content text */}
                        <Text
                            style={this.infoStyle.content}>

                            City Center - Mowega

                        </Text>

                    </View>

                    {/* logo */}
                    <Image
                        style={{
                            position: "absolute",
                            top: "20%",
                            right: "2%",
                            width: wp(30),
                            height: hp(5),
                        }}
                        source={require("../../../assets/logo/logo_with_text_colorful.png")}
                        resizeMode={"contain"}/>

                </View>

                <Image
                    style={{top: -10, zIndex: -1}}
                    source={require("../../../assets/image/map.png")}
                    resizeMode={"stretch"}/>

            </MowContainer>

        )

    }

}