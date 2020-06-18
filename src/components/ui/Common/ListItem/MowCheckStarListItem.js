import React from "react";
import PropTypes from "prop-types";
import {TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {mowColors} from "../../../../values/Colors/MowColors";
import {MowStarView} from "../StarView/MowStarView";
import {borderStyle} from "../../../../values/Styles/MowStyles";
import {MowCheckBox} from "../CheckBox/MowCheckBox";

class MowCheckStarListItem extends React.Component {

    static propTypes = {
        selected: false,
        item: PropTypes.object,
        score: PropTypes.number
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
                    height: hp("7%"),
                    flexDirection: "row",
                    backgroundColor: "transparent",
                    ...borderStyle,
                    marginHorizontal: 10,
                    marginVertical: 5
                }, this.props.style]}>

                <View
                    style={{flex: this.flexStart}}/>

                <View
                    style={{flex: this.flexMid,  justifyContent: "center"}}>

                    <MowStarView
                        width={wp("25%")}
                        height={hp("2.5%")}
                        score={this.props.score}/>

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

export default MowCheckStarListItem;
