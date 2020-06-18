import React from "react";
import PropTypes from "prop-types";
import {Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {borderStyle, fontFamily} from "../../../../values/Styles/MowStyles";
import {mowColors} from "../../../../values/Colors/MowColors";
import {MowCheckBox} from "../CheckBox/MowCheckBox";

class MowCheckListItem extends React.Component {

    static propTypes = {
        selected: false,
        imagePath: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        titleTextStyle: PropTypes.object,
        subtitleTextStyle: PropTypes.object,
        iconName: PropTypes.string,
        item: PropTypes.object
    };

    state = {
        checkboxChecked: false
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

    _onPress(){
        let flag = !this.state.checkboxChecked;
        this.setState({
            checkboxChecked: flag
        });

        if(typeof this.props.onPress == "function"){
            this.props.onPress(this.props.item, flag);
        }
    }

    componentDidMount() {
        this.setState({
            checkboxChecked: this.props.selected,
        })
    }


    render() {

        return (
            <TouchableOpacity
                onPress={() => {this._onPress()}}
                style={[{
                    height: hp("8%"),
                    flexDirection: "row",
                    backgroundColor: "transparent",
                    ...borderStyle,
                    marginHorizontal: 10,
                    marginVertical: 5
                }, this.props.style]}>

                <View
                    style={{flex: this.flexStart}}/>

                <View
                    style={{flex: this.flexMid, backgroundColor: null, flexDirection: "column", justifyContent: "center"}}>

                    <Text
                        style={{
                            fontSize: hp("1.8%"),
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "left",
                            color: "#575757",
                            fontFamily: fontFamily.bold,
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
                                fontSize: hp("1.9%"),
                                ...this.props.subtitleTextStyle
                            }}>

                            {this.props.subtitle}

                        </Text>

                    }

                </View>

                <View
                    style={{flex: this.flexEnd, justifyContent: "center", alignItems: "center"}}>

                    <MowCheckBox
                        onPress={() => {this._onPress()}}
                        checkedColor={mowColors.mainColor}
                        checked={this.state.checkboxChecked}
                        containerStyle={{alignSelf: "center", right: wp("5%")}}/>

                </View>

            </TouchableOpacity>
        )
    }
}

MowCheckListItem.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    onPress: PropTypes.func,
};

export default MowCheckListItem;
