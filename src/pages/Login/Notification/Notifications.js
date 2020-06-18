import React from "react";
import {Text, View, FlatList} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import FeatherIcon from "react-native-vector-icons/Feather";
import {borderStyle, pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import NotificationData from "../../../sampleData/NotificationData";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {MowCheckBox} from "../../../components/ui/Common/CheckBox/MowCheckBox";

export default class Settings extends React.Component {

    state = {
        selectedArr: [],
        notificationListKey: 0
    };

    _handleNotificationRead(index) {

        let selectedArr = this.state.selectedArr;

        // to update selected item as its opposite
        selectedArr[index] = !selectedArr[index];

        this.setState({selectedArr: selectedArr, notificationListKey: this.state.notificationListKey + 1});

    }

    _setAsAllRead() {

        let selectedArr = this.state.selectedArr;

        let length = NotificationData.length;

        for (let i = 0; i < length; i++) {
            selectedArr[i] = true;
        }

        this.setState({selectedArr: selectedArr, notificationListKey: this.state.notificationListKey + 1});

    }

    render() {

        return(

            <MowContainer
                title={mowStrings.notifications.title}>

                <View
                    style={pageContainerStyle}>

                    <FlatList
                        key={this.state.notificationListKey}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={NotificationData}
                        renderItem={({ item, index }) => (

                            // flatList row view
                            <View
                                key={index}
                                style={{
                                    flexDirection: "row",
                                    backgroundColor: mowColors.viewBGColor,
                                    ...borderStyle,
                                    alignItems: "center",
                                    paddingVertical: 10,
                                    marginVertical: 5
                                }}>

                                <View
                                    style={{
                                        width: hp(5),
                                        height: hp(5),
                                        backgroundColor: item["color"],
                                        borderRadius: 100,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginHorizontal: 20
                                    }}>

                                    <FeatherIcon
                                        style={{color: "white", fontSize: hp(3)}}
                                        name={"loader"}/>

                                </View>

                                <View
                                    style={{width: "100%"}}>

                                    <View
                                        style={{justifyContent: "space-between", flexDirection: "row", width: "75%"}}>

                                        {/* title text */}
                                        <Text
                                            style={{
                                                color: mowColors.titleTextColor,
                                                fontSize: hp(1.7),
                                                fontWeight: "bold",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                            }}>

                                            {item["title"]}

                                        </Text>

                                        {/* date text */}
                                        <Text
                                            style={{
                                                color: mowColors.titleTextColor,
                                                fontSize: hp(1.4),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                            }}>

                                            {item["date"]}

                                        </Text>

                                    </View>

                                    <View
                                        style={{justifyContent: "space-between", flexDirection: "row", width: "65%"}}>

                                        {/* message text */}
                                        <Text
                                            style={{
                                                color: mowColors.textColor,
                                                fontSize: hp(1.5),
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "left",
                                            }}>

                                            {item["message"]}

                                        </Text>

                                        {/* checkbox view */}
                                        <MowCheckBox
                                            onPress={() => {this._handleNotificationRead(index)}}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            checkedColor={mowColors.mainColor}
                                            checked={!this.state.selectedArr[index]}
                                            containerStyle={{alignSelf: "center", marginLeft: 10}}/>

                                    </View>

                                </View>

                            </View>

                        )}
                    />

                </View>

                <View
                    style={{marginHorizontal: wp(3)}}>

                    <MowButtonBasic
                        type={"success"}
                        onPress={() => {this._setAsAllRead()}}>

                        {mowStrings.notifications.markAll}

                    </MowButtonBasic>

                </View>

            </MowContainer>

        )

    }

}