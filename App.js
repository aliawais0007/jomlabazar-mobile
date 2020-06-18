import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import SyncStorage from 'sync-storage';
import Router from "./src/pages/Router";
import {mowColorFunction} from "./src/values/Colors/MowColors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {fontFamily} from "./src/values/Styles/MowStyles";
import {mowStrings} from "./src/values/Strings/MowStrings";

let _self;

export default class App extends Component {

    constructor(props){
        super(props);
        _self = this;
        this.state = {
            isReady: false,
        }
    }

    async componentWillMount() {

        console.disableYellowBox = true;

        // to init local storage data, for retrieving data when entered the app
        const data = await SyncStorage.init();

        // to set theme color according to the user selection
        let color = SyncStorage.get("color");
        mowColorFunction(color);

        // to set selected language from user
        let lang = SyncStorage.get("language");

        if (!lang) {

            mowStrings.setLanguage("en");
        }
        else {
            // to update selected language
            mowStrings.setLanguage(lang);
        }

        try {
            // for showing custom splash screen
            window.setTimeout(function () {

                _self.setState({
                    isReady: true,
                })
            }, 500)

        } catch (error) {
            // console.log('App.js error: ', error);
        }

    }

    componentDidMount(){
        // let a = SyncStorage.get('cartItems');
        // alert(a)
        // if(!a){
        //     SyncStorage.set('cartItems',"[]")
        // }
    }

    render() {

        return (

            this.state.isReady !== true ?

                // splash ui here
                <View
                    style={{flex: 1, width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>

                    <Image
                        style={{flex: 1}}
                        resizeMode={"contain"}
                        source={require("./src/assets/image/mowega_splash.jpg")}/>

                    <View
                        style={{position: "absolute", width: "100%", height: hp(11), alignItems: "center", justifyContent: "center"}}>

                        <View
                            style={{position: "absolute",  opacity: 0.7, backgroundColor: "#090909", width: "100%", height: hp(11)}}/>

                        <Image
                            style={{width: "80%", height: hp(4)}}
                            resizeMode={"contain"}
                            source={require("./src/assets/logo/logo_with_text_colorful.png")}/>

                        <Text
                            style={{
                                color: "white",
                                fontSize: hp(2),
                                fontWeight: "normal",
                                fontFamily: fontFamily.regular
                            }}>

                            Shopping

                        </Text>

                    </View>


                </View>

                :

                // after timeout, go to router
                <Router/>

        );
    }

}

