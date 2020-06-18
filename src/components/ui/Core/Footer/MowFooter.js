import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {withNavigation} from "react-navigation";
import {footerHeight} from "../../../../values/Constants/MowConstants";
import {mowStrings} from "../../../../values/Strings/MowStrings";
import FatherIcon from "react-native-vector-icons/Feather";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {mowColors} from "../../../../values/Colors/MowColors";
import PropTypes from 'prop-types';

class MowFooter extends React.Component {

    // footer props
    static propTypes = {
        activeIndex: PropTypes.number
    };

    render() {

        return (

            <View
                style={{
                    height: footerHeight,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    flexDirection: "row",
                    backgroundColor: mowColors.footer,
                    shadowColor: "rgba(0, 0, 0, 0.11)",
                    shadowOffset: {
                        width: 0,
                        height: -3
                    },
                    shadowRadius: 4,
                    shadowOpacity: 1,
                    borderTopWidth: 0.5,
                    borderTopColor: "#a1a1a1"
                }}>

                {/* explore button*/}
                <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate("Home")}}
                    style={styles.buttonView}>

                    <FatherIcon
                        name={"home"}
                        style={[styles.buttonIcon, {color: this.props.activeIndex === 1 ? mowColors.mainColor : "#a1a1a1"}]}/>

                    <Text
                        style={[styles.buttonText, {color: this.props.activeIndex === 1 ? mowColors.mainColor : "#a1a1a1"}]}>

                        {mowStrings.explore}

                    </Text>

                </TouchableOpacity>

                {/* categories button*/}
                <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate("Categories")}}
                    style={styles.buttonView}>

                    <FatherIcon
                        name={"grid"}
                        style={[styles.buttonIcon, {color: this.props.activeIndex === 2 ? mowColors.mainColor : "#a1a1a1"}]}/>

                    <Text
                        style={[styles.buttonText, {color: this.props.activeIndex === 2 ? mowColors.mainColor : "#a1a1a1"}]}>

                        {mowStrings._categories}

                    </Text>

                </TouchableOpacity>

                {/* cart button*/}
                <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate("Cart")}}
                    style={styles.buttonView}>

                    <FatherIcon
                        name={"shopping-bag"}
                        style={[styles.buttonIcon, {color: this.props.activeIndex === 3 ? mowColors.mainColor : "#a1a1a1"}]}/>

                    <Text
                        style={[styles.buttonText, {color: this.props.activeIndex === 3 ? mowColors.mainColor : "#a1a1a1"}]}>

                        {mowStrings.cart}

                    </Text>

                </TouchableOpacity>

                {/* orders button*/}
                <TouchableOpacity
                    onPress={() => {this.props.navigation.navigate("OrderList")}}
                    style={styles.buttonView}>

                    <FatherIcon
                        name={"box"}
                        style={[styles.buttonIcon, {color: this.props.activeIndex === 4 ? mowColors.mainColor : "#a1a1a1"}]}/>

                    <Text
                        style={[styles.buttonText, {color: this.props.activeIndex === 4 ? mowColors.mainColor : "#a1a1a1"}]}>

                        {mowStrings.orders}

                    </Text>

                </TouchableOpacity>

            </View>

        );
    }

}
export default withNavigation(MowFooter);

const styles = StyleSheet.create({
    buttonView: {
        flex: 1,
        alignItems: "center",
        height: "100%"
    },
    buttonIcon: {
        marginTop:  hp("1%"),
        fontSize: wp("5.2%"),
    },
    buttonText: {
        fontSize: wp("3.5%"),
        marginTop:  hp("0.5%")
    }
});