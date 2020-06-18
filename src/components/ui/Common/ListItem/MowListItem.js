import React from "react";
import PropTypes from "prop-types";
import {Image, Text, TouchableOpacity, View} from "react-native";
import FaIcon from "react-native-vector-icons/FontAwesome";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {borderStyle, fontFamily} from "../../../../values/Styles/MowStyles";
import {mowColors} from "../../../../values/Colors/MowColors";

class MowListItem extends React.Component {

    static propTypes = {
        selected: false,
        imagePath: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        titleTextStyle: PropTypes.object,
        subtitleTextStyle: PropTypes.object,
        iconName: PropTypes.string,
        border: PropTypes.bool
    };

    flexStart = 2;
    flexMid = 4;
    flexEnd = 1;

    constructor(props) {
        super(props);

        if (!this.props.imagePath) {
            this.flexStart = 1;
            this.flexMid = 7;
            this.flexEnd = 1;
        }
    }

    render() {

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[{
                    height: hp("10%"),
                    flexDirection: "row",
                    backgroundColor: "transparent",
                    ...borderStyle,
                    borderWidth: this.props.border ? 1 : 0,
                }, this.props.style]}>

                {
                    this.props.imagePath ?
                        <View
                            style={{flex: this.flexStart, backgroundColor: null, justifyContent: "center", alignItems: "center"}}>

                            <Image
                                style={{width: hp("8%"), height: hp("8%")}}
                                resizeMode={"contain"}
                                source={this.props.imagePath}/>

                        </View>

                        :

                        <View
                            style={{flex: this.flexStart}}/>
                }

                <View
                    style={{flex: this.flexMid, backgroundColor: null, flexDirection: "column", justifyContent: "center"}}>

                    <Text
                        style={{
                            fontSize: hp("1.8%"),
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "left",
                            color: mowColors.titleTextColor,
                            fontFamily: fontFamily.bold,
                            right: this.props.imagePath ? 0 : wp(5),
                            ...this.props.titleTextStyle
                        }}>

                        {this.props.title}

                    </Text>

                    {
                        this.props.subtitle != "" && this.props.subtitle &&

                        <Text
                            numberOfLines={3}
                            ellipsizeMode={"tail"}
                            style={{
                                color: "#afafaf",
                                fontSize: hp("1.5%"),
                                right: this.props.imagePath ? 0 : wp(5),
                                ...this.props.subtitleTextStyle
                            }}>

                            {this.props.subtitle}

                        </Text>

                    }

                </View>

                <View
                    style={{flex: this.flexEnd, backgroundColor: null, justifyContent: "center", alignItems: "center"}}>

                    {
                        this.props.selected

                            ?

                            <FaIcon
                                style={{fontSize: hp("2.5%"), color: "green"}}
                                name={"check"} />
                            :

                            <FaIcon
                                style={{fontSize: hp("2.5%"), color: "#e0e0e0"}}
                                name={this.props.iconName || "chevron-right"}/>
                    }

                </View>

            </TouchableOpacity>
        )
    }
}

MowListItem.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
};

export default MowListItem;
