import React from "react";
import Toast from "react-native-easy-toast";
import PropTypes from 'prop-types';
import {mowColors} from "../../../../values/Colors/MowColors";
import {navbarHeight, platform, statusBarHeight} from "../../../../values/Constants/MowConstants";

let mowToastSelf;

export class MowToast extends React.Component {

    // toast prop types
    static propTypes = {
        modalVisible: PropTypes.bool,
        position: PropTypes.oneOf(['bottom', 'top', "center"]),
        positionValue: PropTypes.number,
        fadeInDuration: PropTypes.number,
        fadeOutDuration: PropTypes.number,
        opacity: PropTypes.number,
        textStyle: PropTypes.object,
        visible: PropTypes.bool
    };

    // toast default values
    static defaultProps = {
        positionValue: platform === "ios" ? (statusBarHeight + navbarHeight) : navbarHeight,
        fadeInDuration: 750,
        fadeOutDuration: 1000,
        position: "center",
        opacity: 0.9,
        textStyle: {
            color: "white",
            textAlign: "center",
            fontSize: 15,
            fontWeight:"bold"
        }
    };


    // toast state
    state = {
        bgColor: "",
    };

    constructor(props) {
        super(props);

        // to sign class this value
        mowToastSelf = this;
    }

    // resign this value when navigation go back, etc.
    componentDidUpdate(prevProps, prevState, snapshot) {
        mowToastSelf = this;
    }

    render() {

        return (
            <Toast
                ref="toast"
                style={[
                    {
                        // borderBottomRightRadius: 100,
                        // borderBottomLeftRadius: 100,
                        position: "relative",
                        backgroundColor: this.state.bgColor ? this.state.bgColor : mowColors.mainColor,
                        borderRadius: 0,
                        width: "100%"
                    },
                    this.props.style]}
                {...this.props}
            />
        )
    }
}


class ShowToast {

    // toast visibility time
    duration = 1000;

    // success toast
    success(text, duration) {

        mowToastSelf.setState({
            bgColor: mowColors.successColor
        });
        this.show(text, duration);
    }

    // error toast
    error(text, duration) {

        mowToastSelf.setState({
            bgColor: mowColors.errorColor
        });
        this.show(text, duration);

    }

    // info toast
    info(text, duration) {
        mowToastSelf.setState({
            bgColor: mowColors.infoColor
        });
        this.show(text, duration);
    }

    // warning toast
    warning(text, duration) {
        mowToastSelf.setState({
            bgColor: mowColors.warningColor
        });
        this.show(text, duration);
    }

    show(text, duration) {
        if (!duration) duration = this.duration;

        mowToastSelf.refs.toast.show(text, duration, () => {
            // something you want to do at close
        });
    }


}

export const _showToast = new ShowToast();