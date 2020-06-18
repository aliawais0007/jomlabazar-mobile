import React from "react";
import {View, Image, Text} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {MowInfoHeader} from "../../../components/ui/MowInfoHeader";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";

export default class CompleteOrder extends React.Component {

    render() {

        return(

            <MowContainer
                title={mowStrings.completeOrder.title}>

                <MowInfoHeader
                    activeIndex={3}/>

                <View
                    style={pageContainerStyle}>

                    <Image
                        source={require("../../../assets/icon/ic_confetti.png")}
                        resizeMode={"contain"}
                        style={{
                            marginVertical: hp("3%"),
                            width: hp("10%"),
                            height: hp("10%"),
                            alignSelf: "center"
                        }}/>

                    {/* congrats. text */}
                    <Text
                        style={{
                            fontSize: hp("4%"),
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: mowColors.titleTextColor,
                            marginTop: 10
                        }}>

                        {mowStrings.completeOrder.congratulations}

                    </Text>

                    {/* payment success message text */}
                    <Text
                        style={{
                            fontSize: hp("3%"),
                            fontWeight: "400",
                            fontStyle: "normal",
                            lineHeight: 43,
                            letterSpacing: 0,
                            textAlign: "center",
                            color: mowColors.titleTextColor,
                            marginTop: 20
                        }}>

                        {mowStrings.completeOrder.completeMessage}

                    </Text>

                    {/* order number text */}
                    <Text
                        style={{
                            fontSize: hp("2.2%"),
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: "#df5151",
                            marginTop: 20
                        }}>

                        {mowStrings.completeOrder.orderNumber}: 5468874541

                    </Text>

                    {/* order message text */}
                    <Text
                        style={{
                            fontSize: hp("2.2%"),
                            fontWeight: "bold",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: mowColors.titleTextColor,
                            marginTop: 20
                        }}>

                        {mowStrings.completeOrder.orderMessage }

                    </Text>

                </View>

                <View
                    style={{position: "absolute", bottom: 0, width: "90%", alignSelf: "center"}}>

                    {/* complete payment button */}
                    <MowButtonBasic
                        onPress={() => {this.props.navigation.navigate("Home")}}
                        size={"medium"}
                        type={"success"}>

                        {mowStrings.button.ok}

                    </MowButtonBasic>

                </View>

            </MowContainer>

        )

    }

}