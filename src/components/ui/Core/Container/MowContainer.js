import React from 'react';
import {View} from 'react-native';
import {withNavigation} from "react-navigation";
import {MowLoadingBall} from "../../Common/Loading/MowLoadingBall";
import MowStatusBar from "../StatusBar/MowStatusBar";
import PropTypes from 'prop-types';
import MowDialog from "../../Common/Dialog/MowDialog";
import {MowToast} from "../../Common/Toast/MowToast";
import MowNavbar from "../Navbar/MowNavbar";
import MowFooter from "../Footer/MowFooter";
import {footerHeight} from "../../../../values/Constants/MowConstants";
import {mowColors} from "../../../../values/Colors/MowColors";

/**
 * here is our container class that can call all pages
 */

class MowContainer extends React.Component {

    // page props
    static propTypes = {
        navbar: PropTypes.bool,
        footer: PropTypes.bool,
        title: PropTypes.string,
        statusBar: PropTypes.bool,
        footerActiveIndex: PropTypes.oneOf([1, 2, 3, 4]),
    };

    // default props
    static defaultProps = {
        statusBar: true,
        navbar: true,
        footer: true,
        title: "",
    };

    /**
     *      count value, that is kind of dummy variable, for update component props
     *      because, componentWillReceiveProps is not triggered until props change
     * */

    state = {
        count: 0
    };

    async componentDidMount () {
        // to listen page is showing to user or not
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            // to update count value for props update
            this.setState({count: this.state.count + 1})
        })
    }

    componentWillUnmount () {
        this.focusListener.remove()
    }

    render() {

        return (

            <View
                style={{
                    backgroundColor: mowColors.pageBGColor,
                    flex: 1,
                    paddingBottom: this.props.footer ? footerHeight : 0,
                    ...this.props.style
                }}>

                {/* statusbar */}
                {
                    this.props.statusBar &&

                    <MowStatusBar/>

                }

                {/* navbar */}
                {
                    this.props.navbar &&

                        <MowNavbar
                            title={this.props.title}/>

                }

                {/* children ui that comes from page */}
                <View
                    style={{flex: 1}}>

                    {this.props.children}

                </View>

                {/* loading */}
                <MowLoadingBall
                    count={this.state.count}/>

                {/* footer */}
                {
                    this.props.footer &&

                        <MowFooter
                            activeIndex={this.props.footerActiveIndex}/>
                }

                {/* alert dialog */}
                <MowDialog
                    count={this.state.count}/>

                {/* toast */}
                <MowToast
                    count={this.state.count}/>

            </View>

        );

    }


}

export default withNavigation(MowContainer);
