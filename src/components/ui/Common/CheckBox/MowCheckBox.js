import React from "react";
import {TouchableOpacity} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import PropTypes from 'prop-types';
import {mowColors} from "../../../../values/Colors/MowColors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export class MowCheckBox extends React.Component {

    static propTypes = {
        onPress: PropTypes.func,
        checkedColor: PropTypes.string,
        containerStyle: PropTypes.object,
        checked: PropTypes.bool,
        boxSize: PropTypes.number
    };

    static defaultProps = {
        checked: false,
        checkedColor: mowColors.mainColor,
        boxSize: hp(2.5)
    };

    render() {

        return(

            <TouchableOpacity
                onPress={() => {
                    if (typeof this.props.onPress == "function") {
                        this.props.onPress();
                    }
                }}
                style={{...this.props.containerStyle}}>

                <FAIcon
                    style={{color: this.props.checked ? this.props.checkedColor : "grey", fontSize: this.props.boxSize}}
                    name={this.props.checked ? "check-square-o" : "square-o"}/>

            </TouchableOpacity>

        )

    }
}