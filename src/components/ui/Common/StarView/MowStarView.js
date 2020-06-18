import React from "react";
import PropTypes from 'prop-types';
import Star from 'react-native-star-view';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export class MowStarView extends React.Component {

    static propTypes = {
        score: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number,
    };

    static defaultProps = {
        score: 0,
        width: hp("12%"),
        height: hp("2.5%"),
    };

    render() {

        return(

            <Star
                score={this.props.score}
                style={{width: this.props.width, height: this.props.height, color:"#fab400"}}/>

        )

    }
}
