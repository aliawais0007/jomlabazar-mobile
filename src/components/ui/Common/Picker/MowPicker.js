import React from "react";
import PropTypes from 'prop-types';
import {TouchableOpacity, View, Text, FlatList, Modal} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {_MF} from "../../../utils/MowFunctions/MowFunctions"
import {mowColors} from "../../../../values/Colors/MowColors";
import {MowModal} from "../Modal/MowModal";
import {MowInput} from "../Input/MowInput";
import {fontFamily} from "../../../../values/Styles/MowStyles";

export class MowPicker extends React.Component {

    static propTypes = {
        ...Modal.props,
        modalVisible: PropTypes.bool,
        data: PropTypes.array,
        valueKey: PropTypes.string,
        textKey: PropTypes.string,
        selectedValue: PropTypes.number,
        onSelect: PropTypes.func,
        search: PropTypes.bool,
        pickerTitle: PropTypes.string,
        onClosed: PropTypes.func,
        key: PropTypes.number
    };

    static defaultProps = {
        search: true,
        onClosed: null
    };

    state = {
        modalVisible: false,
        data: [],
        searchedData: [],
        valueKey: "id",
        textKey: "title",
    };

    constructor(props) {
        super(props);

        if (this.props.valueKey) {
            this.state.valueKey = this.props.valueKey;
        }
        if (this.props.textKey) {
            this.state.textKey = this.props.textKey;
        }

        this.state.data = this.props.data;
    }


    componentWillReceiveProps(nextProps, nextContext) {

        this.setState({
            modalVisible: nextProps.modalVisible,
            data: nextProps.data
        })
    }

    _searchData(search) {

        let fullData = this.props.data;
        if (search == "") {
            this.setState({
                data: fullData
            });
            return true;
        }

        let searchedData = _MF.mowSearch(fullData,"title", search);

        this.setState({
            data: searchedData
        })

    }

    _renderItem(item, index) {

        let selected = false;
        let value = item[this.state.valueKey];

        if (this.props.selectedValue == value) {
            selected = true;
        }

        return (

            <TouchableOpacity
                onPress={() => {this.props.onSelect(item)}}
                style={{
                    marginTop: 20,
                    flexDirection: "row",
                    padding: 10,
                    borderRadius: 5,
                    marginHorizontal: wp("4%"),
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "rgba(146, 146, 146, 0.41)",
                    marginVertical: 5
                }}>

                <View
                    style={{width: "90%"}}>

                    <Text
                        style={{
                            fontSize: hp("2%"),
                            fontStyle: "normal",
                            color: mowColors.textColor,
                            fontWeight: "600",
                            paddingLeft: 10,
                            fontFamily: fontFamily.regular,
                        }}>

                        {item[this.state.textKey]}

                    </Text>

                </View>

                <View
                    style={{width: "10%"}}>

                    <FAIcon
                        style={{
                            fontSize: hp("2.5%"),
                            color: selected ? mowColors.mainColor : "#b4b4b4",
                        }}
                        name={selected ? "circle" : "circle-thin"}/>

                </View>

            </TouchableOpacity>
        )

    }

    render() {

        return (

            <MowModal
                key={this.props.key}
                title={this.props.pickerTitle}
                modalVisible={this.props.modalVisible}
                onClosed={this.props.onClosed}>

                {
                    this.props.search &&

                    <View
                        style={{margin: 10}}>

                        <MowInput
                            placeholder={"Search"}
                            leftIcon={"search"}
                            onChangeText={(text) => {this._searchData(text)}}/>

                    </View>
                }

                <View
                    style={{flex: 1, backgroundColor: mowColors.viewBGColor}}>

                    <FlatList
                        data={this.state.data}
                        renderItem={({item, index}) => this._renderItem(item, index)}/>

                </View>

            </MowModal>
        );

    }
}
