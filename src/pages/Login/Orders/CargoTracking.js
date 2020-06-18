import React from "react";
import {FlatList, Text, View} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {cardStyle, pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import MowProductInfoView from "../../../components/ui/MowProductInfoView";
import FeatherIcon from "react-native-vector-icons/Feather";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export default class CargoTracking extends React.Component {

    render() {

        const product = this.props.navigation.getParam("product");

        return(

            <MowContainer
                title={mowStrings.cargoTracking.title}>

                <View
                    style={pageContainerStyle}>

                    {/* product summary view */}
                    <View
                        style={{padding: 15, ...cardStyle, backgroundColor: mowColors.categoryBGColor}}>

                        {/* product summary */}
                        <MowProductInfoView
                            product={product}/>

                    </View>

                    {/* timeline view - cargo tracking */}
                    <View
                        style={{padding: 15, ...cardStyle, marginTop: 15, backgroundColor: mowColors.categoryBGColor}}>

                        {/* title view */}
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                            }}>

                            <FeatherIcon
                                name={"truck"}
                                style={{
                                    color: mowColors.mainColor,
                                    fontSize: hp("3")
                                }}/>

                            <Text
                                style={{
                                    marginLeft: 10,
                                    fontSize: hp("1.5"),
                                    fontWeight: "normal",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "center",
                                    color: mowColors.titleTextColor
                                }}>

                                {mowStrings.cargoTracking.cargoMovements}

                            </Text>

                        </View>

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={product["cargo"]}
                            style={{width: "100%", marginTop: 10}}
                            renderItem={({ item, index }) => (

                                <View
                                    style={{flexDirection: "row", height: hp("10%")}}>

                                    {/* line view */}
                                    <View
                                        style={{flex: 1, alignItems: "center", marginTop: 5}}>

                                        {/* circle view */}
                                        <View
                                            style={{
                                                width: hp("2%"),
                                                height: hp("2%"),
                                                backgroundColor: item["isHere"] ? mowColors.mainColor : "#b6babe",
                                                borderRadius: 100
                                            }}/>

                                        {/* line view */}
                                        {
                                            (product["cargo"].length - 1) !== index &&

                                            <View
                                                style={{
                                                    height: "100%",
                                                    width: 2,
                                                    backgroundColor: "#b6babe"
                                                }}/>
                                        }

                                    </View>

                                    <View
                                        style={{flex: 5, paddingBottom: 10}}>

                                        {/* location text */}
                                        <Text
                                            style={{
                                                fontSize: hp("1.8"),
                                                fontWeight: "bold",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: mowColors.titleTextColor,
                                                marginBottom: 3
                                            }}>

                                            {item["location"]}

                                        </Text>

                                        {/* date text */}
                                        {
                                            item["date"] != "" &&

                                                <Text
                                                    style={{
                                                        fontSize: hp("1.8"),
                                                        fontWeight: "normal",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: mowColors.textColor,
                                                        marginBottom: 3
                                                    }}>

                                                    {item["date"]}

                                                </Text>
                                        }

                                        {/* situation text */}
                                        <Text
                                            style={{
                                                fontSize: hp("1.8"),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                                color: mowColors.textColor,
                                            }}>

                                            {item["situation"]}

                                        </Text>

                                    </View>

                                </View>

                            )}/>

                    </View>

                </View>

            </MowContainer>

        )

    }

}