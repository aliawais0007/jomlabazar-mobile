import React from "react";
import {View, ScrollView} from "react-native";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import MowListItem from "../../../components/ui/Common/ListItem/MowListItem";
import MowCheckListItem from "../../../components/ui/Common/ListItem/MowCheckListItem";
import {PopularPicks, Colors, RatingScore} from "../../../sampleData/FilterData";
import {MowModal} from "../../../components/ui/Common/Modal/MowModal";
import {MowInput} from "../../../components/ui/Common/Input/MowInput";
import {gPadding} from "../../../values/Styles/MowStyles";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import MowCheckStarListItem from "../../../components/ui/Common/ListItem/MowCheckStarListItem";
import {mowColors} from "../../../values/Colors/MowColors";
import PriceRangeData from "../../../sampleData/PriceRangeData";
import { API_ROOT } from "../../../values/Constants/MowConstants";

export default class Filter extends React.Component {

    // to initialize filter data
    state = {
        popularPicks: PopularPicks,
        popularPicksModalVisible: false,
        popularPicksSelected: "",
        popularPicksSelectedItems: [],
        categories: [],
        categoryModalVisible: false,
        categorySelected: "",
        categorySelectedItems: [],
        brands: [],
        brandsModalVisible: false,
        brandsSelected: "",
        brandsSelectedItems: [],
        priceRange: PriceRangeData,
        priceRangeModalVisible: false,
        priceRangeSelected: "",
        priceRangeSelectedItems: [],
        colorModalVisible: false,
        colors: Colors,
        colorSelected: "",
        colorSelectedItems: [],
        bodySizeModalVisible: false,
        ratingScoreModalVisible: false,
        ratingScoreSelected: "",
        ratingScoreSelectedItems: [],
        ratingScore: RatingScore,
        startPrice: "",
        endPrice: "",
        flag:0
    };

    modalView = {
        container: {
            backgroundColor: mowColors.viewBGColor,
            flex: 1
        },
        listTitle: {
            color: mowColors.titleTextColor
        },
        listSubTitle: {
            color: mowColors.textColor
        },
        button: {
            backgroundColor: mowColors.mainColor
        }
    };


    // did mount
    componentDidMount(){
        let flag = 0 ;
        let page = this.props.navigation.state.params.Item;
        if(page = "brnad"){
            flag = 1
        }else if(page = "product"){
            flag = 2
        }else if(page = "supplier"){
            flag = 3
        }else if(page = "buyer"){
            flag = 4
        }
        this.setState({
            flag
        })

        this.fetchCategories();
        this.fetchBrands();
        
    }

// Code to fetch categories from db
 fetchCategories =async()=> {
        const API = API_ROOT+"JomlahBazar/AdminPanel/controllers/client/CON_Categories.php";
        fetch(API)
        .then(response=>{
            if(response.ok){
                return response.json();
            }else throw response.json();
        })
        .then(responseJson=>{
            this.setState({
                categories:responseJson
            })
        })
        .catch(err=>{
            alert(err)
        })
    }

// Code to fetch Brands from db
 fetchBrands =async()=> {
    const API = API_ROOT+"JomlahBazar/AdminPanel/controllers/client/CON_Brands.php";
    fetch(API)
    .then(response=>{
        if(response.ok){
            return response.json();
        }else throw response.json();
    })
    .then(responseJson=>{
        this.setState({
            brands:responseJson
        })
    })
    .catch(err=>{
        alert(err)
    })
}


    // to store user input
    onChangeText = (key, value) => {
        this.setState({
            [key]: value,
        })
    };

    _setSelectedItems = (key, value) => {
        this.setState({
            [key]: value,
        })
    };

    // if flag -> item selected, else -> item unselected
    _categoryCallback = (data, flag) => {
        let arr = this.state.categorySelectedItems;
        this._handleArrayOperations(arr, "categorySelectedItems", flag, data)
    };

    // if flag -> item selected, else -> item unselected
    _brandCallback = (data, flag) => {
        let arr = this.state.brandsSelectedItems;
        this._handleArrayOperations(arr, "brandsSelectedItems", flag, data)
    };

    // if flag -> item selected, else -> item unselected
    _priceRangeCallback = (data, flag) => {
        let arr = this.state.priceRangeSelectedItems;
        this._handleArrayOperations(arr, "priceRangeSelectedItems", flag, data)
    };

    // if flag -> item selected, else -> item unselected
    _colorCallback = (data, flag) => {
        let arr = this.state.colorSelectedItems;
        this._handleArrayOperations(arr, "colorSelectedItems", flag, data)
    };

    // if flag -> item selected, else -> item unselected
    _bodySizeCallback = (data, flag) => {
        let arr = this.state.bodySizeSelectedItems;
        this._handleArrayOperations(arr, "bodySizeSelectedItems", flag, data)
    };

    // if flag -> item selected, else -> item unselected
    _ratingScoreCallback = (data, flag) => {
        let arr = this.state.ratingScoreSelectedItems;
        this._handleArrayOperations(arr, "ratingScoreSelectedItems", flag, data)
    };

    _handleArrayOperations(arr, key, flag, data) {

        if (flag) {
            arr.push(data);
        }
        else {
            if (arr) {
                // to remove item when unselected from array
                arr.splice(arr.indexOf(data), 1);
            }
        }

        this._setSelectedItems(key, arr);
    }

    // to get all selection and sum in one string value to show user what selected
    _arrayToString(arr, key) {
        let title = "";

        for (let i in arr) {
            title += arr[i]["title"] + ((i != arr.length - 1) ? ", " : "");
        }

        this.setState({[key]: title});
    }

    // to control user selection, data is selected or not by user
    _checkSelected(data, id) {
        let arr = [];

        for (let i in data) {
            let row = data[i];
            arr.push(row.id);
        }

        return arr.indexOf(id) != -1;
    }

    render() {

        return(

            <MowContainer
                style={{backgroundColor: mowColors.viewBGColor}}
                title={mowStrings.filter.title}>

                <View
                    style={{flex: 1}}>

                    {/* category item list */}
                    <ScrollView>

                        {/* category item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.category}
                            subtitle={this.state.categorySelected}
                            onPress={() =>{this.setState({categoryModalVisible: true})}}/>

                        {/* brands item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.brand}
                            subtitle={this.state.brandsSelected}
                            onPress={() =>{this.setState({brandsModalVisible: true})}}/>

                        {/* price range item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.priceRange}
                            subtitle={this.state.priceRangeSelected}
                            onPress={() =>{this.setState({priceRangeModalVisible: true})}}/>

                        {/* color item */}
                        {/* <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.color}
                            subtitle={this.state.colorSelected}
                            onPress={() =>{this.setState({colorModalVisible: true})}}/> */}

                        {/* body size item */}
                        {/* <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.bodySize}
                            subtitle={this.state.bodySizeSelected}
                            onPress={() =>{this.setState({bodySizeModalVisible: true})}}/> */}

                        {/* rating score item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.ratingScore}
                            subtitle={this.state.ratingScoreSelected}
                            onPress={() =>{this.setState({ratingScoreModalVisible: true})}}/>

                    </ScrollView>

                    {/* category modal */}
                    <MowModal
                        title={mowStrings.filter.category}
                        onClosed={() =>{ this.setState({categoryModalVisible: false})}}
                        modalVisible={this.state.categoryModalVisible}>

                        <View
                            style={this.modalView.container}>

                            {
                                this.state.categories.map((value, index) =>{

                                    return (
                                        <MowCheckListItem
                                            selected={this._checkSelected(this.state.categorySelectedItems, value["id"])}
                                            key={index}
                                            item={value}
                                            titleTextStyle={this.modalView.listTitle}
                                            subtitleTextStyle={this.modalView.listSubTitle}
                                            title={value.name}
                                            onPress={this._categoryCallback}/>
                                    )
                                })
                            }

                            {/* button view */}
                            <View
                                style={modalStyle.buttonView}>

                                {/* apply button */}
                                <MowButtonBasic
                                    onPress={() => {
                                        this._arrayToString(this.state.categorySelectedItems, "categorySelected");
                                        this.setState({categoryModalVisible: false});
                                    }}
                                    stickyIcon={true}
                                    leftIcon={"check"}
                                    containerStyle={this.modalView.button}
                                    type={"success"}>

                                    {mowStrings.button.apply}

                                </MowButtonBasic>

                            </View>

                        </View>

                    </MowModal>

                    {/* brand modal */}
                    <MowModal
                        title={mowStrings.filter.brand}
                        onClosed={() =>{ this.setState({brandsModalVisible: false})}}
                        modalVisible={this.state.brandsModalVisible}>

                        <View
                            style={this.modalView.container}>

                            {
                                this.state.brands.map((value, index) =>{

                                    return (
                                        <MowCheckListItem
                                            selected={this._checkSelected(this.state.brandsSelectedItems, value["id"])}
                                            titleTextStyle={this.modalView.listTitle}
                                            subtitleTextStyle={this.modalView.listSubTitle}
                                            key={index}
                                            item={value}
                                            title={value.brand_name}
                                            onPress={this._brandCallback}/>
                                    )
                                })
                            }

                            {/* button view */}
                            <View
                                style={modalStyle.buttonView}>

                                {/* apply button */}
                                <MowButtonBasic
                                    onPress={() => {
                                        this._arrayToString(this.state.brandsSelectedItems, "brandsSelected");
                                        this.setState({brandsModalVisible: false});
                                    }}
                                    containerStyle={this.modalView.button}
                                    stickyIcon={true}
                                    leftIcon={"check"}
                                    type={"success"}>

                                    {mowStrings.button.apply}

                                </MowButtonBasic>

                            </View>

                        </View>

                    </MowModal>

                    {/* price range modal */}
                    <MowModal
                        title={mowStrings.filter.priceRange}
                        onClosed={() =>{ this.setState({priceRangeModalVisible: false})}}
                        modalVisible={this.state.priceRangeModalVisible}>

                        <View
                            style={{padding:gPadding, ...this.modalView.container}}>

                            <View
                                style={{flexDirection: "row"}}>

                                <MowInput
                                    containerStyle={{flex: 1, marginRight: 5}}
                                    type={"number"}
                                    value={this.state.startPrice}
                                    onChangeText={value => this.onChangeText('startPrice', value)}
                                    placeholder={mowStrings.filter.startPrice}/>

                                <MowInput
                                    containerStyle={{flex: 1, marginLeft: 5}}
                                    type={"number"}
                                    value={this.state.endPrice}
                                    onChangeText={value => this.onChangeText('endPrice', value)}
                                    placeholder={mowStrings.filter.endPrice}/>

                            </View>

                            {
                                this.state.priceRange.map((value, index) =>{

                                    return (
                                        <MowCheckListItem
                                            style={{marginHorizontal: 0}}
                                            selected={this._checkSelected(this.state.priceRangeSelectedItems, value["id"])}
                                            key={index}
                                            item={value}
                                            title={value.title}
                                            titleTextStyle={this.modalView.listTitle}
                                            subtitleTextStyle={this.modalView.listSubTitle}
                                            onPress={this._priceRangeCallback}/>
                                    )
                                })
                            }

                            {/* button view */}
                            <View
                                style={modalStyle.buttonView}>

                                {/* apply button */}
                                <MowButtonBasic
                                    onPress={() => {
                                        this._arrayToString(this.state.priceRangeSelectedItems, "priceRangeSelected");
                                        this.setState({priceRangeModalVisible: false});
                                    }}
                                    stickyIcon={true}
                                    containerStyle={this.modalView.button}
                                    leftIcon={"check"}
                                    type={"success"}>

                                    {mowStrings.button.apply}

                                </MowButtonBasic>

                            </View>

                        </View>

                    </MowModal>

                  
                    {/* rating score modal */}
                    <MowModal
                        title={mowStrings.filter.ratingScore}
                        onClosed={() =>{ this.setState({ratingScoreModalVisible: false})}}
                        modalVisible={this.state.ratingScoreModalVisible}>

                        <View
                            style={this.modalView.container}>

                            {
                                this.state.ratingScore.map((value, index) =>{

                                    return ( 
                                        <MowCheckStarListItem
                                            score={value["title"]}
                                            selected={this._checkSelected(this.state.ratingScoreSelectedItems, value["id"])}
                                            key={index} 
                                            titleTextStyle={this.modalView.listTitle}
                                            subtitleTextStyle={this.modalView.listSubTitle}
                                            item={value}
                                            onPress={this._ratingScoreCallback}/>
                                    )
                                })
                            }

                            {/* button view */}
                            <View
                                style={modalStyle.buttonView}>

                                {/* apply button */}
                                <MowButtonBasic
                                    onPress={() => {
                                        this._arrayToString(this.state.ratingScoreSelectedItems, "ratingScoreSelected");
                                        this.setState({ratingScoreModalVisible: false});
                                    }}
                                    containerStyle={this.modalView.button}
                                    stickyIcon={true}
                                    leftIcon={"check"}
                                    type={"success"}>

                                    {mowStrings.button.apply}

                                </MowButtonBasic>

                            </View>

                        </View>

                    </MowModal>

                </View>

                {/* button view */}
                <View
                    style={{...modalStyle.buttonView, bottom: 0}}>

                    {/* apply button */}
                    <MowButtonBasic
                        onPress={() => {this.props.navigation.navigate("ProductList")}} // send here filter data, then request server with filter data for filtered products
                        stickyIcon={true}
                        containerStyle={{backgroundColor: mowColors.mainColor}}
                        leftIcon={"check"}
                        type={"success"}>

                        {mowStrings.button.apply}

                    </MowButtonBasic>

                </View>

            </MowContainer>

        )

    }

}

const listItemStyle = ({
    container: {
        marginVertical: 5,
        marginHorizontal: 10,
        height: hp(8)
    },
    subtitle: {
        color: mowColors.mainColor
    }
});

const modalStyle = ({
    buttonView: {
        position: "absolute",
        bottom: 20,
        width: "90%",
        alignSelf: "center",
    }
});
