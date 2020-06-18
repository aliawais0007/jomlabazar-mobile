import React from "react";
import PropTypes from 'prop-types';
import {View, Modal, Text} from "react-native";
import {mowColors} from "../../../../values/Colors/MowColors";
import {MowButtonBasic} from "../Button/MowButton";
import MowStatusBar from "../../Core/StatusBar/MowStatusBar";
import {navbarHeight} from "../../../../values/Constants/MowConstants";
import {mowStrings} from "../../../../values/Strings/MowStrings";
import {fontFamily} from "../../../../values/Styles/MowStyles";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export class MowModal extends React.Component {

    static propTypes = {
        ...Modal.props,
        modalVisible: PropTypes.bool,
        onClosed: PropTypes.func,
        title: PropTypes.string,
        closeButton: PropTypes.bool
    };

    static defaultProps = {
        onClosed: null,
        closeButton: true
    };

    state = {
        modalVisible : false,
        key: 0
    };

    constructor(props) {
        super(props);

        this.state.modalVisible = this.props.modalVisible;

        // this.state.key++;
    }

    componentWillReceiveProps(nextProps, nextContext) {

        this.setState({
            modalVisible: nextProps.modalVisible
        });
        // this.state.key++;
    }

    _setModalVisible(flag){
        this.setState({
            modalVisible: flag
        });

        if(typeof  this.props.onClosed == "function"){
            this.props.onClosed()
        }
    }

    render() {

        if (this.state.modalVisible) {

            return (

                <Modal
                    supportedOrientations={['portrait', 'landscape']}
                    animationType="slide"
                    transparent={false}
                    // key={this.state.key}
                    {...this.props}>

                    <MowStatusBar/>

                    <View
                        style={{backgroundColor: mowColors.mainColor, height: navbarHeight, flexDirection: "row", alignItems: "center"}}>

                        {/* modal close button */}
                        {
                            this.props.closeButton &&

                            <MowButtonBasic
                                filled={false}
                                size={"small"}
                                leftIconStyle={{
                                    position: "relative",
                                    left: 0,
                                    marginRight: 5,
                                }}
                                containerStyle={{
                                    width: "25%",
                                    alignSelf: "flex-start",
                                    elevation: 0,
                                    margin: 0,
                                    padding: 0,
                                    height: navbarHeight,
                                    borderWidth: 0,
                                    alignItems: "center"
                                }}
                                leftIcon={"x-circle"}
                                onPress={() => {this._setModalVisible(false)}}>

                                {mowStrings.button.close}

                            </MowButtonBasic>
                        }

                        {
                            this.props.title &&

                                <Text
                                    style={{
                                        alignSelf: "center",
                                        width: this.props.closeButton ? "50%" : "100%",
                                        textAlign: "center",
                                        color: "white",
                                        fontFamily: fontFamily.bold,
                                        fontSize: hp("2%")
                                    }}>

                                    {this.props.title}

                                </Text>
                        }

                    </View>

                    {this.props.children}

                </Modal>

            );

        }

        return null;

    }
}
