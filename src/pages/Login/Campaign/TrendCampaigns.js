import React from "react";
import {FlatList, Image, TouchableOpacity} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import TrendCampaignMore from "../../../sampleData/Campaign/TrendCampaignMore";

export default class TrendCampaigns extends React.Component {

    render() {

        return(

            <MowContainer
                title={mowStrings.homeScreen.trendCampaign}>

                <FlatList
                    showsVErticalScrollIndicator={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={TrendCampaignMore}
                    renderItem={({ item, index }) => (

                        // trend brands item touchable
                        <TouchableOpacity
                            style={{
                                width: "100%",
                                height: hp("30%"),
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            key={index}>

                            {/* brand image */}
                            <Image
                                style={{width: "100%", height: "100%"}}
                                source={item["image"]}
                                resizeMode={"stretch"}/>

                        </TouchableOpacity>

                    )}
                />

            </MowContainer>

        )

    }

}