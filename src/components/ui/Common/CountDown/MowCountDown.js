import React from "react";
import PropTypes from 'prop-types';
import CountDown from 'react-native-countdown-component';
import {mowColors} from "../../../../values/Colors/MowColors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export class MowCountDown extends React.Component {

    static propTypes = {
        size: PropTypes.number,
        timeToLeft: PropTypes.number
    };

    static defaultProps = {
        size: 15,
        timeToLeft: 1000
    };

    render() {

        return(

            <CountDown
                size={this.props.size}
                until={this.props.timeToLeft}
                // onFinish={() => alert('Finished')}
                digitStyle={{backgroundColor: mowColors.timerBG, borderRadius: 1000, padding: 0, width: hp(3.5), height: hp(3.5)}}
                digitTxtStyle={{color: mowColors.timerText, fontSize: hp(1.7)}}
                // timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                separatorStyle={{color: "white"}}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{m: null, s: null}}
                showSeparator={true}/>

        )

    }
}