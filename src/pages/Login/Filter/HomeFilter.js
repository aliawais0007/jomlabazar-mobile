import React from "react";
import {View, TouchableOpacity, Text, FlatList} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {borderStyle, fontFamily, pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";
import {_MF} from "../../../components/utils/MowFunctions/MowFunctions"
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {navbarHeight} from "../../../values/Constants/MowConstants";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {MowInput} from "../../../components/ui/Common/Input/MowInput";
import {mowStrings} from "../../../values/Strings/MowStrings";
import PopularSearch from "../../../sampleData/PopularSearch";
import SyncStorage from "sync-storage";

export default class HomeFilter extends React.Component {

    state = {
        searchText: "",
        searchData: [],
        searchListKey: 0
    };

    componentDidMount() {
        let searchArr = SyncStorage.get("searchData");

        if (searchArr != null && searchArr.length > 0) {
            this.setState({searchData: searchArr});
        }
    }

    // to store user input
    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        })
    };

    _clearSearchHistory() {
        let searchArr = [];
        SyncStorage.set('searchData', searchArr);

        this.setState({searchData: searchArr, searchListKey: this.state.searchListKey + 1});
    }

    _handleSearch(value) {
        if (value) {
            // handle searched word here
            // to save searched word
            this._saveSearch(value);
            alert('you are searching for '+value)
            this.props.navigation.navigate("ProductList", {item:"", search:value});
            
        }
    }

    _goToCategoryList(searchData) {
        alert(searchData.searchText)
        this.props.navigation.navigate("ProductList", {item:"", search:searchData.searchText})
    }

    // to save searched word
    _saveSearch(value) {
        let searchArr = SyncStorage.get("searchData");

        if (searchArr == null || searchArr.length === 0) {
            searchArr = [];
        }

        // to control search text searched before or not
        let isExist = _MF.mowInArray(searchArr, "searchText", value);

        if (!isExist) {
            // not searched, then push
            let obj = {searchText: value};
            searchArr.push(obj);
        }

        // to store search array
        SyncStorage.set("searchData", searchArr);

        this.setState({searchData: searchArr, searchListKey: this.state.searchListKey + 1});
    }

    render() {

        return(

            <MowContainer
                footer={false}
                navbar={false}>

                <View
                    style={{height:navbarHeight,flexDirection:"row", backgroundColor: mowColors.mainColor, alignItems: "center"}}>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack(null)}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 10,
                        }}>

                        <FAIcon
                            style={{fontSize: hp("4%")}}
                            color={"white"}
                            name={'angle-left'}/>

                    </TouchableOpacity>
                    <MowInput
                        onSubmitEditing={(event) => this._handleSearch(event.nativeEvent.text)}
                        returnKeyType='search'
                        leftIcon={"search"}
                        containerStyle={{flex: 7, borderWidth: 0, height: hp(4.5), marginHorizontal: 10, borderRadius: 10}}
                        textInputStyle={{...titleStyle.title, padding: 0, margin: 0, color: "#aeaeae"}}
                        placeholder={mowStrings.search}
                        onChangeText={value => this.onChangeText("searchText", value)}/>

                    </View>

                <View
                    style={pageContainerStyle}>

                    {/* popular search view */}
                    <View>

                        {/* popular search text */}
                        <Text
                            style={titleStyle.title}>

                            {mowStrings.filter.popularSearch}

                        </Text>

                        {/* popular item view */}
                        <View
                            style={{marginVertical: 5}}>

                            {/* popular item list */}
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={PopularSearch}
                                renderItem={({item, index}) => (

                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {this._goToCategoryList(item)}}
                                        style={{
                                            marginRight: 10,
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: mowColors.viewBGColor,
                                            paddingHorizontal: 10,
                                            borderRadius: 20,
                                            paddingVertical: 10,
                                            ...borderStyle
                                        }}>

                                        <FAIcon
                                            name={"search"}
                                            style={{fontSize: hp("2"), color: mowColors.mainColor, marginRight: 5}}/>

                                        <Text
                                            style={{
                                                fontSize: hp("1.4"),
                                                fontFamily: fontFamily.regular,
                                                letterSpacing: 0.5,
                                                fontWeight: "normal",
                                                fontStyle: "normal",
                                                lineHeight: 18,
                                                textAlign: "left",
                                                color: mowColors.titleTextColor

                                            }}>

                                            {item["title"]}

                                        </Text>

                                    </TouchableOpacity>

                                )}/>

                        </View>

                    </View>

                    {/* search history view */}
                    {
                        (this.state.searchData.length > 0) &&

                            <View>

                                {/* search history view */}
                                <View>

                                    {/* title view */}
                                    <View
                                        style={{flexDirection: "row", justifyContent: "space-between", marginTop: hp("2%"), marginBottom: hp(1), margin: 5}}>

                                        {/* search history text */}
                                        <Text
                                            style={titleStyle.title}>

                                            {mowStrings.filter.searchHistory}

                                        </Text>

                                        {/* clear search history button */}
                                        <TouchableOpacity
                                            onPress={() => this._clearSearchHistory()}>

                                            <Text
                                                style={{...titleStyle.title, fontWeight: "500"}}>

                                                {mowStrings.filter.clear}

                                            </Text>

                                        </TouchableOpacity>

                                    </View>

                                </View>

                                <View>

                                    <FlatList
                                        key={this.state.searchListKey}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => index.toString()}
                                        data={this.state.searchData}
                                        renderItem={({item, index}) => (

                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => {this._goToCategoryList(item)}}
                                                style={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    backgroundColor: mowColors.viewBGColor,
                                                    paddingHorizontal: 10,
                                                    borderRadius: 5,
                                                    borderBottomWidth: 0.3,
                                                    borderBottomColor: "grey",
                                                    paddingVertical: 10,
                                                    ...borderStyle,
                                                    marginVertical: 1
                                                }}>

                                                <Text
                                                    style={{
                                                        fontSize: hp("1.5"),
                                                        fontFamily: fontFamily.regular,
                                                        fontWeight: "500",
                                                        fontStyle: "normal",
                                                        lineHeight: 23,
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: mowColors.textColor,
                                                        paddingLeft: 5
                                                    }}>

                                                    {item["searchText"]}

                                                </Text>

                                            </TouchableOpacity>

                                        )}/>

                                </View>

                            </View>
                    }

                </View>

            </MowContainer>

        )

    }

}

const titleStyle = ({
    title: {
        fontSize: hp(1.5),
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: mowColors.titleTextColor
    }
});