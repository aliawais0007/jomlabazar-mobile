import React from "react";
import {View, FlatList, Text} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {pageContainerStyle} from "../../../values/Styles/MowStyles";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import FAQData from "../../../sampleData/FAQData";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {mowColors} from "../../../values/Colors/MowColors";

export default class FAQ extends React.Component {

    state = {
        flagArr: [],
        faqKey: 0
    };

    _handleButtonClick(index) {
        let flagArr = this.state.flagArr;

        let length = FAQData.length;

        for (let i = 0; i < length; i++) {
            if (i != index) {
                // to set false all array values except selected index
                flagArr[i] = false;
            }
        }

        // to update selected item as its opposite
        flagArr[index] = !flagArr[index];

        this.setState({flagArr: flagArr, faqKey: this.state.faqKey + 1}); //key update is required for update the flatList ui
    }

    render() {

        return(

            <MowContainer
                title={mowStrings.faq.title}>

                <View
                    style={pageContainerStyle}>

                    <FlatList
                        key={this.state.faqKey}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={FAQData}
                        renderItem={({ item, index }) => (

                            <View>

                                {/* question button */}
                                <MowButtonBasic
                                    onPress={() => {this._handleButtonClick(index)}}
                                    textStyle={{
                                        fontSize: hp("1.6"),
                                        fontWeight: "500",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "left",
                                        color: "#ffffff",
                                        paddingLeft: 15
                                    }}
                                    rightIcon={this.state.flagArr[index] ? "chevron-up" : "chevron-down"}
                                    containerStyle={{
                                        justifyContent: "flex-start",
                                        marginBottom: 0,
                                        marginTop: 20,
                                        borderBottomRightRadius: this.state.flagArr[index] ? 0 : 5,
                                        borderBottomLeftRadius: this.state.flagArr[index] ? 0 : 5,
                                    }}
                                    type={"success"}>

                                    {item["question"]}

                                </MowButtonBasic>

                                {/* answer view */}
                                {
                                    this.state.flagArr[index] &&

                                        <View
                                            style={{
                                                borderRadius: 5,
                                                borderTopLeftRadius: 0,
                                                borderTopRightRadius: 0,
                                                backgroundColor: mowColors.viewBGColor,
                                                padding: 10
                                            }}>

                                            <Text
                                                style={{
                                                    fontSize: hp("1.5"),
                                                    fontWeight: "normal",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "left",
                                                    color: mowColors.textColor
                                                }}>

                                                {item["answer"]}

                                            </Text>

                                        </View>
                                }

                            </View>

                        )}/>

                </View>

            </MowContainer>

        )

    }

}