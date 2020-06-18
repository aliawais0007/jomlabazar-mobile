import React from 'react';
import {View, StatusBar} from 'react-native';
import {platform, statusBarHeight} from "../../../../values/Constants/MowConstants";
import {mowColors} from "../../../../values/Colors/MowColors";

export default class MowStatusBar extends React.Component {

    render() {
        return (

            <View>

                {
                    platform === "ios"  ?

                        // ios status bar
                        <View>
                            <View style={{backgroundColor: mowColors.statusbarColor, height:statusBarHeight}}/>
                            <StatusBar backgroundColor={mowColors.statusbarColor} barStyle="light-content" />
                        </View>

                        :

                        // android status bar
                        <StatusBar backgroundColor={mowColors.statusbarColor} barStyle="light-content" />

                }

            </View>

        );
    }

}