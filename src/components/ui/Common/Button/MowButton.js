import React from "react";
import PropTypes from 'prop-types';
import {Text, TouchableOpacity} from "react-native";
import {shadowStyle} from "../../../../values/Styles/MowStyles";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {mowColors} from "../../../../values/Colors/MowColors";
import FeatherIcon from "react-native-vector-icons/Feather";

/**
 * Hello dear developer.
 * This component is core of all buttons. You change base sizes, base colors and what you want.
 */

/***
 *  button height according to the button type
 */
const _buttonSizes = {
    big: {
        button: {
            height: hp("7%")
        },
        text: {
            fontSize: 20,
        },
        icon: {
            fontSize: 25,
        },
    },
    medium: {
        button: {
            height: hp("6%")
        },
        text: {
            fontSize: 18,
        },
        icon: {
            fontSize: 22,
        },
    },
    small: {
        button: {
            height: hp("4.2%")
        },
        text: {
            fontSize: hp("1.4%")
        },
        icon: {
            fontSize: 19,
        },
    },
    xSmall: {
        button: {
            height: hp("3.4%")
        },
        text: {
            fontSize: 13,
        },
        icon: {
            fontSize: 17,
        },
    }
};



class MowButtonBase extends React.Component {

    static propTypes = {
        ...TouchableOpacity.props,

    };

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableOpacity
                {...this.props}>

                {this.props.children}

            </TouchableOpacity>
        )
    }
}


export class MowButtonBasic extends React.Component {

    static propTypes = {
        ...MowButtonBase.props,
        textStyle: PropTypes.object,
        type: PropTypes.oneOf(['default', 'success', 'danger', 'warning', 'info']),
        size: PropTypes.oneOf(['big', 'medium', 'small', 'xSmall']),
        leftIcon: PropTypes.string,
        leftIconStyle: PropTypes.object,
        rightIcon: PropTypes.string,
        rightIconStyle: PropTypes.object,
        stickyIcon: PropTypes.bool,
        filled: PropTypes.bool,
        shadow: PropTypes.bool,
        containerStyle: PropTypes.object
    };

    static defaultProps = {
        filled: true,
        type: "default"
    };

    state = {
        leftIcon: null,
        rightIcon: null,
    };

    constructor(props) {
        super(props);
        this._doSetting();
    }

    _getSelectedBtnColor() {
        let buttonColors = {
            default: "white",
            success: mowColors.successColor,
            warning: mowColors.warningColor,
            danger: mowColors.errorColor,
            info: mowColors.infoColor
        };
        return buttonColors[this.props.type];
    }
    _setSelectedSizes() {
        /**
         *  button size according to the height
         */
        let size = this.props.size;
        if (!size) {
            size = "medium";
        }

        this.btnStyle.height = _buttonSizes[size].button.height;
        this.textStyle.fontSize = _buttonSizes[size].text.fontSize;
        this.iconStyle.fontSize = _buttonSizes[size].icon.fontSize;
    }

    _getSelectedTextColor() {
        return (!this.props.filled ? this._getSelectedBtnColor() : "white");
    }

    _setTextStyle() {

        return this.textStyle = {color: this._getSelectedTextColor(), fontWeight: "bold", marginHorizontal: this.props.stickyIcon ? 10 : 0}
    }

    _setIconStyle() {

        return this.iconStyle = {color: this._getSelectedTextColor(), position: this.props.stickyIcon ? "relative" : "absolute"};
    }

    _setBtnStyle() {

        this.btnStyle = {
            flexDirection: "row",
            margin: 10,
            width: "100%",
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: "center",
            padding: 0,
            height: hp("7%"),
            backgroundColor: mowColors.mainColor,
            borderRadius: 5
        };
        if (this.props.filled) {
            this.btnStyle.backgroundColor = this._getSelectedBtnColor();
        }else {
            this.btnStyle.backgroundColor = "transparent";
            this.btnStyle.borderWidth = 1.5;
            this.btnStyle.borderColor = this._getSelectedBtnColor();
        }

        // to set shadow style to the button
        if (this.props.shadow) {
            Object.assign(this.btnStyle, shadowStyle)
        }
    }

    _doSetting() {

        /**
         * Generate and set button style according to the props.
         * YOU CAN CHANGE AND CREATE YOUR OWN STYLE
         */
        this._setBtnStyle();

        /**
         * Generate Button Text Style
         */
        this._setTextStyle();

        /**
         * Generate left or right icon style
         */
        this._setIconStyle();

        /**
         * Set sizes according to size prop
         */
        this._setSelectedSizes();

        /**
         *  left & right icon assigning
         */
        this.state.leftIcon = this.props.leftIcon;
        this.state.rightIcon = this.props.rightIcon;

    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        /**
         * redo settings for preventing button props when opening popup, modal, etc.
         */
        this._doSetting()
    }

    render() {
        return (

            <MowButtonBase
                {...this.props}
                style={[
                    this.btnStyle,
                    this.props.containerStyle
                ]}>

                {
                    this.state.leftIcon &&

                    <FeatherIcon
                        style={[
                            this.iconStyle,
                            {
                                left: this.props.stickyIcon ? 0 : 20,
                                ...this.props.leftIconStyle
                            }
                        ]}
                        name={this.state.leftIcon}/>
                }


                <Text
                    style={[
                        this.textStyle,
                        {...this.props.textStyle}
                    ]}>

                    {this.props.children}

                </Text>

                {
                    this.state.rightIcon &&

                    <FeatherIcon
                        style={[
                            this.iconStyle,
                            {
                                right: this.props.stickyIcon ? 0 : 20,
                                ...this.props.rightIconStyle
                            }
                        ]}
                        name={this.state.rightIcon}/>
                }

            </MowButtonBase>
        )
    }
}
