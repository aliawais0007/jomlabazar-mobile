import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {cardStyle, fontFamily, pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import MowProductInfoView from "../../../components/ui/MowProductInfoView";
import {MowStarView} from "../../../components/ui/Common/StarView/MowStarView";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {MowInput} from "../../../components/ui/Common/Input/MowInput";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {MowCheckBox} from "../../../components/ui/Common/CheckBox/MowCheckBox";

export default class RateProduct extends React.Component {

    state = {
        fiveStar: false,
        fourStar: false,
        threeStar: false,
        twoStar: false,
        oneStar: false,
        reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };

    _handleStarSelection(fiveStar, fourStar, threeStar, twoStar, oneStar) {
        this.setState({
            fiveStar: fiveStar,
            fourStar: fourStar,
            threeStar: threeStar,
            twoStar: twoStar,
            oneStar: oneStar
        });
    }

    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        })
    };

    render() {

        const product = this.props.navigation.getParam("product");

        return(

            <MowContainer
                title={mowStrings.rateProduct.title}>

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    style={pageContainerStyle}>

                    {/* product summary view */}
                    <View
                        style={{padding: 15, ...cardStyle, backgroundColor: mowColors.categoryBGColor}}>

                        {/* product summary */}
                        <MowProductInfoView
                            product={product}/>

                    </View>

                    {/* star selection view  */}
                    <View
                        style={{marginTop: 15, backgroundColor: mowColors.categoryBGColor, paddingHorizontal: 10, borderRadius: 5}}>

                        {/* star view container */}
                        <TouchableOpacity
                            onPress={() => this._handleStarSelection(true, false, false, false, false)}
                            style={starStyle.container}>

                            {/* star view */}
                            <View
                                style={starStyle.starView}>

                                <MowStarView
                                    score={5}/>

                                <Text
                                    style={starStyle.text}>

                                    5 {mowStrings.star}

                                </Text>

                            </View>

                            <MowCheckBox
                                onPress={() => this._handleStarSelection(true, false, false, false, false)}
                                checkedColor={mowColors.mainColor}
                                checked={this.state.fiveStar}
                                containerStyle={starStyle.checkBoxView}/>

                        </TouchableOpacity>

                        {/* star view container */}
                        <TouchableOpacity
                            onPress={() => this._handleStarSelection(false, true, false, false, false)}
                            style={starStyle.container}>

                            {/* star view */}
                            <View
                                style={starStyle.starView}>

                                <MowStarView
                                    score={4}/>

                                <Text
                                    style={starStyle.text}>

                                    4 {mowStrings.star}

                                </Text>

                            </View>

                            <MowCheckBox
                                onPress={() => this._handleStarSelection(false, true, false, false, false)}
                                checkedColor={mowColors.mainColor}
                                checked={this.state.fourStar}
                                containerStyle={starStyle.checkBoxView}/>

                        </TouchableOpacity>

                        {/* star view container */}
                        <TouchableOpacity
                            onPress={() => this._handleStarSelection(false, false, true, false, false)}
                            style={starStyle.container}>

                            {/* star view */}
                            <View
                                style={starStyle.starView}>

                                <MowStarView
                                    score={3}/>

                                <Text
                                    style={starStyle.text}>

                                    3 {mowStrings.star}

                                </Text>

                            </View>

                            <MowCheckBox
                                onPress={() => this._handleStarSelection(false, false, true, false, false)}
                                checkedColor={mowColors.mainColor}
                                checked={this.state.threeStar}
                                containerStyle={starStyle.checkBoxView}/>

                        </TouchableOpacity>

                        {/* star view container */}
                        <TouchableOpacity
                            onPress={() => this._handleStarSelection(false, false, false, true, false)}
                            style={starStyle.container}>

                            {/* star view */}
                            <View
                                style={starStyle.starView}>

                                <MowStarView
                                    score={2}/>

                                <Text
                                    style={starStyle.text}>

                                    2 {mowStrings.star}

                                </Text>

                            </View>

                            <MowCheckBox
                                onPress={() => this._handleStarSelection(false, false, false, true, false)}
                                checkedColor={mowColors.mainColor}
                                checked={this.state.twoStar}
                                containerStyle={starStyle.checkBoxView}/>

                        </TouchableOpacity>

                        {/* star view container */}
                        <TouchableOpacity
                            onPress={() => this._handleStarSelection(false, false, false, false, true)}
                            style={starStyle.container}>

                            {/* star view */}
                            <View
                                style={starStyle.starView}>

                                <MowStarView
                                    score={1}/>

                                <Text
                                    style={starStyle.text}>

                                    1 {mowStrings.star}

                                </Text>

                            </View>

                            <MowCheckBox
                                onPress={() => this._handleStarSelection(false, false, false, false, true)}
                                checkedColor={mowColors.mainColor}
                                checked={this.state.oneStar}
                                containerStyle={starStyle.checkBoxView}/>

                        </TouchableOpacity>

                    </View>

                    <View
                        style={{marginTop: 15, backgroundColor: mowColors.categoryBGColor, padding: 10}}>

                        {/* message title */}
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.textColor,
                                fontFamily: fontFamily.medium
                            }}>

                            {mowStrings.rateProduct.reviewText}

                        </Text>

                        {/* message input */}
                        <MowInput
                            type={"textarea"}
                            containerStyle={{
                                width: "100%",
                                height: hp("15%")
                            }}
                            textInputStyle={{
                                fontSize: hp("1.8%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                fontFamily: fontFamily.regular,
                                textAlign: "left",
                                color: "#aeaeae",
                                width: "100%",
                                paddingBottom: 10
                            }}
                            value={this.state.reviewText}
                            onChangeText={value => this.onChangeText('reviewText', value)}/>

                    </View>

                </KeyboardAwareScrollView>

                {/* send button view */}
                <View
                    style={{marginHorizontal: wp("3%")}}>

                    {/* send button */}
                    <MowButtonBasic
                        type={"success"}>

                        {mowStrings.button.send}

                    </MowButtonBasic>

                </View>

            </MowContainer>

        )

    }

}

const starStyle = ({
    container: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 8,
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        marginVertical: 8,
    },
    starView: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    text: {
        fontSize: hp("1.8%"),
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "right",
        color: "#707070",
    },
    checkBoxView: {
        flex: 2,
        alignSelf: "center",
        alignItems: "flex-end"
    }
});