import React from "react";
import {View, ScrollView} from "react-native";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import MowListItem from "../../../components/ui/Common/ListItem/MowListItem";
import MowCheckListItem from "../../../components/ui/Common/ListItem/MowCheckListItem";
import {PopularPicks, Locations, Colors} from "../../../sampleData/FilterData";
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
import { MowPicker } from "../../../components/ui/Common/Picker/MowPicker";

export default class Filter extends React.Component {

    // to initialize filter data
    state = {
        rating:"0",
        brand:"0",
        category:"0",
        popularPick:"0",
        location:"0",
        locations: Locations,
        locationModalVisible: false,
        locationSelected:"",
        locationSelectedItem: {},

        popularPicks: PopularPicks,
        popularPicksModalVisible: false,
        popularPicksSelected:"",
        popularPicksSelectedItem: {},
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
        ratingScoreModalVisible: false,
        ratingScoreSelected: "",
        ratingScoreSelectedItems: [],
        ratingScore: [],
        startPrice: "",
        endPrice: "",
        flag:0,
        search:"",

        products:[]
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
        let page = this.props.navigation.state.params.item;
        let search = this.props.navigation.state.params.search;
        if(page.toLowerCase() === "brands"){
            flag = 1
        }else if(page.toLowerCase() === "products"){
            flag = 2
        }else {
            flag = 3
        }

        this.setState({
            flag, search:search
        });

        this.fetchCategories();
        this.fetchBrands();

        let ratingScore = [{name:1, value:1, type:"rating"},{name:2, value:2, type:"rating"},{name:3, value:3, type:"rating"},{name:4, value:4, type:"rating"},{name:5, value:5, type:"rating"}];
        this.setState({
            ratingScore:ratingScore
        })
        
    }

    fetchProducts = async(API) => {
        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else throw response.json();
            })
            .then(responseJson => {
                let products = [...responseJson.products];
                products.map((item, index)=>{
                    let imgs = item.imgs;
                    let images = [];
                    imgs.map(img =>{
                        let root = "http://localhost/JomlahBazar/AdminPanel/pics/";
                        let a = {image: `uri(${root}${img.path})`}
                        images.push(a)
                    });
                    item['images'] = images;
                    item['stock'] = true;
                    item['currency'] = "$";
                    item['new'] = false;
                    item['discountRate'] = null;  
                });
                this.props.navigation.state.params.fetchResult(products);
                this.props.navigation.navigate('ProductList');

            })
            .catch(err => {
                this.setState({
                    isFetched:true,err:err.message
                })
            }
                )
    }


    _handleFilterResults=()=>{
        let {startPrice, endPrice, category, brand, rating, popularPicks,location, search, flag, popularPick} = this.state;
        let API =API_ROOT+ `JomlahBazar/AdminPanel/controllers/client/CON_Products.php?search=${search}&search_by=${flag}&filter_category=${category}&min_price=${startPrice}&max_price=${endPrice}&filter_brand=${brand}&filter_rank=${rating}&filter_location=${location}`;
        if(popularPick == '1'){
            API = API+`&fp=1`;
        }
        else if(popularPick == '2'){
            API = API+`&bp=1`;
        }
        else API = API+`&dp=1`;

        this.fetchProducts(API);
        // this.props.navigation.navigate("ProductList")
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
            let data = [];
            responseJson.map((item, index)=>{
                data.push({
                    name:item.name,
                    value:index,
                    type:"category"
                })
            })
            this.setState({
                categories:data
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

        let brands =[];
         responseJson[1].map((item , index)=>{
            brands.push({
                value:index,
                name:item['brand_name'],
                type:"brand"
            });
        });
        this.setState({
            brands:brands
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

    _onSelect(selectedItem) {
        if(selectedItem.type === "category"){
            this.setState({
                category:selectedItem.value, categoryModalVisible:false
            });
        }
        else if(selectedItem.type === "brand"){
            this.setState({
                brand:selectedItem.value, brandsModalVisible:false
            });
        }
        else if(selectedItem.type === "location"){
            this.setState({
                location:selectedItem.value, locationModalVisible:false
            });
        }
        else if(selectedItem.type === "popularpick"){
            this.setState({
                popularPick:selectedItem.value, popularPicksModalVisible:false
            });
        }
        else{
            this.setState({
                rating:selectedItem.value, ratingScoreModalVisible:false
            });
        }      
       
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

                        {/* popularpicks item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={"Popular Picks"}
                            subtitle={this.state.popularPicksSelected}
                            onPress={() =>{this.setState({popularPicksModalVisible: true})}}/>

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


                        {/* rating score item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={mowStrings.filter.ratingScore}
                            subtitle={this.state.ratingScoreSelected}
                            onPress={() =>{this.setState({ratingScoreModalVisible: true})}}/>


                        {/* Location item */}
                        <MowListItem
                            border={true}
                            style={listItemStyle.container}
                            subtitleTextStyle={listItemStyle.subtitle}
                            title={"Locations"}
                            subtitle={this.state.locationSelected}
                            onPress={() =>{this.setState({locationModalVisible: true})}}/>
                    </ScrollView>

            







            
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

                  
                  
                </View>

                {/* button view */}
                <View
                    style={{...modalStyle.buttonView, bottom: 0}}>

                    {/* apply button */}
                    <MowButtonBasic
                        onPress={() => this._handleFilterResults()} // send here filter data, then request server with filter data for filtered products
                        stickyIcon={true}
                        containerStyle={{backgroundColor: mowColors.mainColor}}
                        leftIcon={"check"}
                        type={"success"}>

                        {mowStrings.button.apply}

                    </MowButtonBasic>

                </View>

                
                {/* picker for locations */}
                <MowPicker
                    key={2}
                    pickerTitle={"Select Location"}
                    selectedValue={this.state.locationSelected}
                    onSelect={(obj) => { this._onSelect(obj) }}
                    title={mowStrings.picker.sort.title}
                    search={false}
                    modalVisible={this.state.locationModalVisible}
                    onClosed={() => { this.setState({ locationModalVisible: false }) }}
                    data={Locations} />


                {/* picker for categories */}
                <MowPicker
                    key={2}
                    pickerTitle={"Select Categories"}
                    selectedValue={this.state.categorySelected}
                    onSelect={(obj) => { this._onSelect(obj) }}
                    title={mowStrings.picker.sort.title}
                    search={false}
                    modalVisible={this.state.categoryModalVisible}
                    onClosed={() => { this.setState({ categoryModalVisible: false }) }}
                    data={this.state.categories} />

                     {/* picker for Brands */}
                <MowPicker
                    key={2}
                    pickerTitle={"Select Brands"}
                    selectedValue={this.state.brandsSelected}
                    onSelect={(obj) => { this._onSelect(obj) }}
                    title={mowStrings.picker.sort.title}
                    search={false}
                    modalVisible={this.state.brandsModalVisible}
                    onClosed={() => { this.setState({ brandsModalVisible: false }) }}
                    data={this.state.brands} />

                        {/* picker for PopularPick */}
                <MowPicker
                    key={2}
                    pickerTitle={"Popular Picks"}
                    selectedValue={this.state.popularPicksSelected}
                    onSelect={(obj) => { this._onSelect(obj) }}
                    title={mowStrings.picker.sort.title}
                    search={false}
                    modalVisible={this.state.popularPicksModalVisible}
                    onClosed={() => { this.setState({ popularPicksModalVisible: false }) }}
                    data={PopularPicks} />

                {/* picker for Rating */}
                <MowPicker
                    key={2}
                    pickerTitle={"Slect Rating"}
                    selectedValue={this.state.ratingScoreSelected}
                    onSelect={(obj) => { this._onSelect(obj) }}
                    title={mowStrings.picker.sort.title}
                    search={false}
                    modalVisible={this.state.ratingScoreModalVisible}
                    onClosed={() => { this.setState({ ratingScoreModalVisible: false }) }}
                    data={this.state.ratingScore} />
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
