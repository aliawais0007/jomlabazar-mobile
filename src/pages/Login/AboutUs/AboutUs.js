import React from "react";
import {View, Image, Text} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export default class AboutUs extends React.Component {

    render() {

        return(

            <MowContainer
                title={mowStrings.drawerMenu.aboutUs}>

                <View
                    style={{...pageContainerStyle, alignItems: "center"}}>

                    {/* banner image */}
                    <Image
                        source={require("../../../assets/image/mowega_office.png")}
                        resizeMode={"contain"}
                        style={{width: "100%", height: hp(30)}}/>

                    {/* content text */}
                    <Text
                        style={{
                            color: mowColors.textColor,
                            fontSize: hp(1.8),
                            fontWeight: "normal",
                            marginTop: 20,
                            paddingHorizontal: 5
                        }}>

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nulla vel malesuada metus. Donec lacus elit, volutpat eu
                        fermentum semper, vestibulum at sapien. Nam sed
                        pellentesque est. Pellentesque euismod est eros,
                        pretium interdum lorem venenatis ut. Quisque
                        fermentum massa et iaculis iaculis. Sed massa tortor,
                        imperdiet ut nulla sed, volutpat accumsan dui. Phasellus
                        et congue tellus. Nullam pretium sapien eu risus
                        tincidunt tempus

                    </Text>

                </View>

            </MowContainer>

        )

    }

}