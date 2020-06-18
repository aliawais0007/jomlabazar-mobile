import React from 'react';
import {View, Text} from "react-native";
import {BallIndicator} from "react-native-indicators";
import {mowColors} from "../../../../values/Colors/MowColors";
import {deviceWidth} from "../../../../values/Constants/MowConstants";

let _self;

export class MowLoadingBall extends React.Component {

    constructor(props){
        super(props);

        _self = this;

        this.state = {
            showLoading: false,
            loadingText: ""
        };

        global.__loadingThis = this;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        global.__loadingThis = this;
    }

    showLoading(text = "") {
        this.setState({
            showLoading: true,
            loadingText: text
        })
    }

    hideLoading() {
        this.setState({
            showLoading: false,
            loadingText: ""
        })
    }

    render() {

        if(this.state.showLoading === true)
        {
            return(

                <View
                    style={{
                        zIndex: 9999,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                    <View style={[{
                        backgroundColor: "black",
                        opacity: 0.5,
                        position: "absolute",
                        width: "100%",
                        height: "100%"
                    }]}/>

                    <BallIndicator
                        size={40}
                        color={mowColors.loadingIndicatorColor}/>

                    <Text
                        style={{
                            height: 50,
                            width: deviceWidth,
                            fontSize: 23,
                            textAlign: "center",
                            top: "-42%",
                            color: "white"
                        }}>

                        {this.state.loadingText}

                    </Text>

                </View>

            )
        }

        return null;
    }

}