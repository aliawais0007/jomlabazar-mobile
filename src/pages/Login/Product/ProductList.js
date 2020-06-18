import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import WomanClothing from "../../../sampleData/WomanClothing";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { MowStarView } from "../../../components/ui/Common/StarView/MowStarView";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { MowPicker } from "../../../components/ui/Common/Picker/MowPicker";
import { platform, API_ROOT } from "../../../values/Constants/MowConstants";
import { borderStyle, fontFamily, paginationStyle } from "../../../values/Styles/MowStyles";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { _showToast } from "../../../components/ui/Common/Toast/MowToast";
import { navbarHeight } from "../../../values/Constants/MowConstants";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import SyncStorage from "sync-storage";
import { _errorDialog } from "../../../components/ui/Common/Dialog/MowDialogFunctions";
// const images = [
//     {
//         image: require("../../assets/image/women_2.png")
//     },
//     {
//         image: require("../../assets/image/women_1.png")
//     },
//     {
//         image: require("../../assets/image/women_3.png")
//     }
//       ];


let pickerSortData = [
    { id: 4, title: mowStrings.picker.sort.lowestPrice },
    { id: 5, title: mowStrings.picker.sort.highestPrice },
    { id: 6, title: mowStrings.picker.sort.topRated },
    { id: 7, title: mowStrings.picker.sort.highestScore },
    { id: 8, title: mowStrings.picker.sort.lowestScore },
    { id: 1, title: mowStrings.picker.sort.smartSorting },
    { id: 2, title: mowStrings.picker.sort.bestSeller },
    { id: 3, title: mowStrings.picker.sort.newest }
];

let self;

export default class ProductList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pickerVisible: false,
            pickerSelectedId: null,
            ProductList: [],
            productListKey: 0,
            boxView: true,
            activeIndex: 0,
            activeSlide: [],
            Item: "",
            searchText: "",
            productLength:0,
            isFetched:false,
            err:"",
            duplicate:[],
            cartItems:[]
        };

        self = this;
    }


   


    fetchProducts = async() => {
        const search_category = this.props.navigation.state.params.search_category;
        const search_by = this.props.navigation.state.params.search_by;
        const search = this.props.navigation.state.params.search;
        let API = API_ROOT + "JomlahBazar/AdminPanel/controllers/client/CON_Products.php?";

        // search by
        if (search_by && search_by.toLowerCase() === "brand") {
            API = API + "search_by=1"
        }
        else if (search_by && search_by.toLowerCase() === "product") {
            API = API + "search_by=2"
        }
        else if (search_by && search_by.toLowerCase() === "supplier") {
            API = API + "search_by=3"
        }
        else if (search_by && search_by.toLowerCase() === "buyer") {
            API = API + "search_by=4"
        }
        else if (search_by && search_by.toLowerCase() === "location") {
            API = API + "search_by=5"
        }
        else {
            API = API + "search_by=0"
        }

        // category
        if (search_category && search_category.toLowerCase() === "perfumes") {
            API = API + "&search_category=0";
        }
        else if (search_category && search_category.toLowerCase() === "cosmetics") {
            API = API + "&search_category=0";
        }
        else {
            API = API + "&search_category=0";
        }

        // search
        if (search) {
            API = API + `&search=${search}`;
        }

        else API = API + `&search=`
        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else throw response.json();
            })
            .then(responseJson => {
                    this.fetchImages(responseJson);
            })
            .catch(err => {
                this.setState({
                    isFetched:true,err:err.message
                })
            }
                )
    }

    fetchImages = async(responseJson) => {
        for(let i=0; i<responseJson.length; i++){       
            let images=[];
            let Image_root="";
            responseJson[i]['images'] = WomanClothing[i].images;
            responseJson[i]['stock'] = true;
            responseJson[i]['currency'] = "$";
            responseJson[i]['new'] = false;
            responseJson[i]['discountRate'] = null;   
            await fetch(API_ROOT+`JomlahBazar/AdminPanel/controllers/client/CON_ProductImage.php?productId=${responseJson[i].productId}`)
            .then(imgResposne=>{if(response.ok){
                return imgResposne.json();
            }else  throw imgResposne.json();
        
        })
            .then(imageRes=>
                {
                    
                    Image_root = "http://localhost/JomlahBazar/AdminPanel/pics/products/"+imageRes[0][0];
                   
                    images=  [
                        {
                            image: uri(Image_root)
                        }
                    ];
                   
                     
                })
                .catch(err=>this.setState({err:err.message})) 
              
        }
        
        this.setState({
            ProductList: responseJson, isFetched:true, productLength:responseJson.length
})

    }
    componentDidMount() {
        // initializing localStorage if not present
        let cart = SyncStorage.get('cartItems');
        if(!cart){
            SyncStorage.set('cartItems',"[]")
        }
        let wish = SyncStorage.get('wishList');
        if(!wish){
            SyncStorage.set('wishList',"[]")
        }
        // initializing localStorage if not present


        const Item = this.props.navigation.state.params.item;
        this.setState({ Item })
        this.fetchProducts();
        // to set all active index as 0
        let arr = [];
        let length = WomanClothing.length;
        for (let i = 0; i < length; i++) {
            arr[i] = 0;
        }
        this.setState({ activeSlide: arr });
    }

    // to handle (sort) picker selection
    _onSelect(selectedItem) {

        /**
         * id --> selected item id for sorting
         *
         *      1 --> according to the smart sorting
         *      2 --> according to the best seller
         *      3 --> according to the newest value
         *      4 --> according to the price (lowest -> highest)
         *      5 --> according to the price (highest -> lowest)
         *      6 --> according to the top rate
         *      7 --> according to the score (highest -> lowest)
         *      8 --> according to the score (lowest -> highest)
         *
         * */

        let id = selectedItem["id"];

        // selected id control
        switch (id) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                this._increaseSort("lastPrice");
                break;
            case 5:
                this._decreaseSort("lastPrice");
                break;
            case 6:
                this._decreaseSort("voteCount");
                break;
            case 7:
                this._decreaseSort("star");
                break;
            case 8:
                this._increaseSort("star");
                break;
        }

        // to update selected id & picker visibility
        this.setState({
            pickerSelectedId: id,
            pickerVisible: false
        })

    }

    // ascending order according to the key
    _increaseSort(productKey) {
        let products = this.state.productList;

        // to sort and update the product array
        products = products.sort((a, b) => parseFloat(a[productKey]) - parseFloat(b[productKey]));

        // to update list
        this.setState({ productList: products, productListKey: this.state.productListKey });
    }

    // descending order according to the key
    _decreaseSort(productKey) {
        let products = this.state.productList;

        // to sort and update the product array
        products = products.sort((a, b) => parseFloat(b[productKey]) - parseFloat(a[productKey]));

        // to update list
        this.setState({ productList: products, productListKey: this.state.productListKey });
    }

    _renderImages({ item, index }) {
        return (
            <TouchableOpacity
                onPress={() => { self.props.navigation.navigate("ProductDetail", { product: this.state.productList[index] }) }}
                key={index}>

                <Image
                    style={{ height: "100%", width: "100%", borderRadius: 10 }}
                    resizeMode={"stretch"}
                    source={item["image"]} />

            </TouchableOpacity>
        );
    }
    checkDuplicates=(cartItems, product)=>{
        let duplicate = [];
        duplicate = cartItems.length> 1 && cartItems.filter(unit=>JSON.stringify(unit.productId) ===JSON.stringify(product.productId));
        return duplicate;
    }

    _addToCart(product) {
        if(SyncStorage.get('isLogin')){
            this._handleLoggedInCart(product.productId)
        }


        else {
        let cartItems = SyncStorage.get('cartItems');
       cartItems = JSON.parse(cartItems);
       let duplicates =[];
       duplicates = this.checkDuplicates(cartItems, product);
       this.setState({duplicate:duplicates})
       if(duplicates.length >0){
        alert("Product is already in cart");
        return 
       };
        let item ={};
        item["productId"] = product.productId;
        item["name"] = product.name;
        item['stock'] = product.stock
        item['currency'] = product.currency;
        item['price'] = product.unitprice;
        item['totalPrice'] = product.unitprice;
        item['brand'] = product.brand_name;
        item['images'] = product.images;
        item['count'] = 1;
        cartItems.push(item);
        cartItems = JSON.stringify(cartItems);
        SyncStorage.set('cartItems', cartItems);
        _showToast.success("Product added to Cart");
    }
    }


    _handleLoggedInCart=(productId)=>{
        let uid = SyncStorage.get('uid');
        // let formData = new FormData();
        // formData.push('userId',uid);
        // formData.push('productId', productId);
        let API = API_ROOT+'JomlahBazar/AdminPanel/controllers/client/CON_Add_Cart.php?';
        API = API + `userId=${uid}&productId=${productId}`;
        fetch(API)
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            else throw response.json();
        })
        .then(responseJson=>{
            switch (responseJson) {
                case 0:
                    _showToast.success(mowStrings.productAdded);
                  break;
                case 1:
                  /*Error*/
                  /*similate 2s delay*/
                  setTimeout(function () {
                    _errorDialog(
                      "Error",
                      "Product already existed in cart"
                    );
                  }, 2000);
                  break;
                case 2:
                  /*Error*/
                  /*similate 2s delay*/
                  setTimeout(function () {
                    _errorDialog(
                      "Error",
                      "Missing required parameters. Please try again."
                    );
                  }, 2000);
                  break;
                case 3:
                  /*Error*/
                  /*similate 2s delay*/
                  setTimeout(function () {
                    _errorDialog(
                      "Error",
                      "Missing required parameters. Please try again."
                    );
                  }, 2000);
                  break;
                default:
                  _errorDialog("Error", "Can't add product to cart. Please contact support.");
              }
        })
    }

    // image pagination style
    pagination(data, index) {
        return (
            <Pagination
                dotsLength={data.length}
                activeDotIndex={this.state.activeSlide[index]}
                containerStyle={paginationStyle.container}
                dotStyle={[paginationStyle.activeDot, { backgroundColor: mowColors.pagination.activeDot }]}
                inactiveDotStyle={[paginationStyle.passiveDot, { backgroundColor: mowColors.pagination.passiveDot }]}
                inactiveDotOpacity={paginationStyle.inactiveDotOpacity}
                inactiveDotScale={paginationStyle.inactiveDotScale} />
        );
    }

    // to handle active slide for all items
    _handleActiveSlide(activeSlide, index) {
        let activeSlideArr = this.state.activeSlide;
        activeSlideArr[index] = activeSlide;
        this.setState({
            activeSlide: activeSlideArr,
        });
    }


    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    _handleSearch(value) {
        if (value) {
            const search_category = this.props.navigation.state.params.search_category;
            const search_by = this.props.navigation.state.params.search_by;
            const search = value;
            let API = API_ROOT + "JomlahBazar/AdminPanel/controllers/client/CON_Products.php?";
            if (search_by && search_by.toLowerCase() === "brand") {
                API = API + "search_by=1"
            }
            else if (search_by && search_by.toLowerCase() === "product") {
                API = API + "search_by=2"
            }
            else if (search_by && search_by.toLowerCase() === "supplier") {
                API = API + "search_by=3"
            }
            else if (search_by && search_by.toLowerCase() === "buyer") {
                API = API + "search_by=4"
            }
            else if (search_by && search_by.toLowerCase() === "location") {
                API = API + "search_by=5"
            }
            else {
                API = API + "search_by=0"
            }

            if (search_category && search_category.toLowerCase() === "perfumes") {
                API = API + "&search_category=0";
            }
            else if (search_category && search_category.toLowerCase() === "cosmetics") {
                API = API + "&search_category=0";
            }
            else {
                API = API + "&search_category=0";
            }
            if (search) {
                API = API + `&search=${search}`;
            }
            else API = API + `&search=`

            fetch(API)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else throw response.json();
                })
                .then(responseJson => {
                    
                    responseJson.map(item => {
                        let images=[];
                        let Image_root="";
                        fetch(API_ROOT+"JomlahBazar/AdminPanel/controllers/client/CON_ProductImage.php"+item.productId)
                        .then(imgResposne=>{if(response.ok){
                            return imgResposne.json();
                        }})
                        .then(image=>
                            {
                                Image_root = "http://localhost/JomlahBazar/AdminPanel/pics/products/"+item[0][0];
                                images=  [
                                    {
                                        image: uri(Image_root)
                                    }
                                ];

                               
                            })
                            item['images'] = images;
                            item['stock'] = true;
                            item['currency'] = "$";
                            item['new'] = false;
                            item['discountRate'] = null;
                       
                    })

                    this.setState({
                        ProductList: responseJson, isFetched:true, productLength:responseJson.length
                    })
                })
                .catch(err => {
                    this.setState({
                         isFetched:true
                    })
                    alert(err);
                })
        }
    }







    _addToWishList(product) {
        if(SyncStorage.get('isLogin')){
            this._handleLoggedInWishList(product.productId)
        }


        else {
        let wishList = SyncStorage.get('wishList');
        wishList = JSON.parse(wishList);
       let duplicates =[];
       duplicates = this.checkDuplicates(wishList, product);
       this.setState({duplicate:duplicates})
       if(duplicates.length >0){
        alert("Product is already in wishlist");
        return 
       };
        let item ={};
        item["productId"] = product.productId;
        item["name"] = product.name;
        item['stock'] = product.stock
        item['currency'] = product.currency;
        item['price'] = product.unitprice;
        item['totalPrice'] = product.unitprice;
        item['brand'] = product.brand_name;
        item['images'] = product.images;
        item['count'] = 1;
        wishList.push(item);
        wishList = JSON.stringify(wishList);
        SyncStorage.set('wishList', wishList);
        _showToast.success("Product added to wishlist");
    }
    }


    _handleLoggedInWishList=(productId)=>{
        let uid = SyncStorage.get('uid');
        // let formData = new FormData();
        // formData.push('userId',uid);
        // formData.push('productId', productId);
        let API = API_ROOT+'JomlahBazar/AdminPanel/controllers/client/CON_Add_Wishlist.php?';
        API = API + `userId=${uid}&productId=${productId}`;
        fetch(API)
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            else throw response.json();
        })
        .then(responseJson=>{
            switch (responseJson) {
                case 0:
                    _showToast.success("Product added to wishlist");
                  break;
                case 1:
                  /*Error*/
                  /*similate 2s delay*/
                  setTimeout(function () {
                    _errorDialog(
                      "Error",
                      "Product already in wish list"
                    );
                  }, 2000);
                  break;
                case 2:
                  /*Error*/
                  /*similate 2s delay*/
                  setTimeout(function () {
                    _errorDialog(
                      "Error",
                      "Missing required parameters. Please try again."
                    );
                  }, 2000);
                  break;
                case 3:
                  /*Error*/
                  /*similate 2s delay*/
                  setTimeout(function () {
                    _errorDialog(
                      "Error",
                      "Missing required parameters. Please try again."
                    );
                  }, 2000);
                  break;
                default:
                  _errorDialog("Error", "Can't add product to wishlist. Please contact support.");
              }
        })
    }


    fetchResults=(items)=>{
        this.setState({
            items
        })
    }

    render() {
        const Title = this.state.Item;
        const {isFetched, productLength} = this.state;
        return (

            <MowContainer
                navbar={false}
                statusBar={false}
            >
                 <View
                    style={{ height: hp("4%"),padding:hp("0.2%"),paddingTop:hp("0.4%"), flexDirection: "row", backgroundColor: mowColors.mainColor, alignItems: "center", justifyContent:"center", color:"white" }}>

                        <Text
                          style={{
                            fontSize: hp("3%"),
                            fontWeight: "500",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: mowColors.pageBGColor,
                        }}
                        >
                            {this.state.Item ? this.state.Item : "Search" }
                            </Text>
                            </View>

               
                <View
                    style={{ height: navbarHeight, flexDirection: "row", backgroundColor: mowColors.mainColor, alignItems: "center" }}>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack(null)}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 5,
                        }}>

                        <FAIcon
                            style={{ fontSize: hp("4%") }}
                            color={"white"}
                            name={'angle-left'} />

                    </TouchableOpacity>

                    <MowInput
                        onSubmitEditing={(event) => this._handleSearch(event.nativeEvent.text)}
                        returnKeyType='search'
                        leftIcon={"search"}
                        containerStyle={{ flex: 6, borderWidth: 0, height: hp(4.5), marginHorizontal: 10, borderRadius: 100 }}
                        textInputStyle={{ ...titleStyle.title, width: "80%", padding: 0, margin: 0, color: "#aeaeae" }}
                        placeholder={`Search here`}
                        onChangeText={value => this.onChangeText("searchText", value)} />

                </View>

                {/* filter view */}
                <View
                    style={{
                        marginVertical: hp("2%"),
                        marginHorizontal: wp("3%"),
                        borderRadius: 5,
                        backgroundColor: mowColors.filterHeaderBG,
                        padding: 10,
                        flexDirection: "row",
                    }}>

                    {/* icon view */}
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ boxView: !this.state.boxView, productListKey: this.state.productListKey + 1 });

                        }}
                        style={{ justifyContent: "center", alignItems: "center", flex: 2 }}>

                        <FAIcon
                            style={{
                                color: mowColors.textColor,
                                fontSize: hp("3%"),
                                flex: 1,
                                height: "100%",
                            }}
                            name={!this.state.boxView ? "th-large" : "list"} />

                    </TouchableOpacity>

                    {/* vertical line view */}
                    <View
                        style={{
                            width: 1,
                            height: "100%",
                            backgroundColor: "#a4a4a4",
                        }} />

                    {/* order by view */}
                    <TouchableOpacity
                        onPress={() => { this.setState({ pickerVisible: true }) }}
                        style={{ flexDirection: "row", flex: 5, alignItems: "center", justifyContent: "center" }}>

                        {/* order icon */}
                        <FAIcon
                            style={{
                                color: mowColors.textColor,
                                fontSize: hp("3%"),
                            }}
                            name={"sort"} />

                        {/* order text */}
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "500",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: mowColors.textColor,
                                marginLeft: 5,
                                fontFamily: fontFamily.light
                            }}>

                            {mowStrings.products.orderBy}

                        </Text>

                    </TouchableOpacity>

                    {/* vertical line view */}
                    <View
                        style={{
                            width: 1,
                            height: "90%",
                            backgroundColor: "#a4a4a4",
                        }} />
                    {/* filter view */}
                    <TouchableOpacity
                        style={{ flexDirection: "row", flex: 5, alignItems: "center", justifyContent: "center" }}
                        onPress={() => { this.props.navigation.navigate("Filter", {fetchResult:this.fetchResults, item:Title})}}>

                        {/* order icon */}
                        <FAIcon
                            style={{
                                color: mowColors.textColor,
                                fontSize: hp("3%"),
                            }}
                            name={"filter"} />

                        {/* order text */}
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "500",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "center",
                                color: mowColors.textColor,
                                marginLeft: 5,
                                fontFamily: fontFamily.light
                            }}>

                            {mowStrings.products.filter}

                        </Text>

                    </TouchableOpacity>

                </View>

                {!isFetched &&
                <View style={{justifyContent:"center", alignItems:"center", height:hp(80)}}>
                    <Text>Loading ...</Text>
                </View>
                }

                {isFetched && productLength < 1 &&
                <View style={{justifyContent:"center", alignItems:"center", height:hp(80)}}>
                    <Text>No {Title} available</Text>
                </View>
                }

                {/* product list */}
                {
                    this.state.boxView

                        ?

                        // box view
                        <View
                            style={{ flex: 1 }}>

                            <FlatList
                                key={this.state.productListKey}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                numColumns={2}
                                style={{ paddingHorizontal: wp("3%") }}
                                data={this.state.ProductList}
                                renderItem={({ item, index }) => (

                                    //product item
                                    <View
                                        key={index}
                                        style={{ margin: 5, flex: 1 }}>

                                        {/* image view */}
                                        <View
                                            style={{
                                                height: platform === "android" ? hp("25") : hp("21"),
                                                width: "100%",
                                                borderRadius: 10,
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}>

                                            {/* hearth icon touchable */}
                                            <TouchableOpacity
                                            onPress={()=>this._addToWishList(item)}
                                                style={{ position: "absolute", top: 10, right: 10, zIndex: 99 }}>

                                                <FAIcon
                                                    style={{
                                                        color: "grey",
                                                        fontSize: hp("2%")
                                                    }}
                                                    name={"heart"} />

                                            </TouchableOpacity>

                                            {/* didn't use swiper, because multiple swiper causes android ui problem */}
                                            {/* product image slider */}
                                            <Carousel
                                                removeClippedSubviews={false}
                                                ref={(c) => { this._carousel = c }}
                                                data={item["images"]}
                                                onSnapToItem={(activeSlide) => this._handleActiveSlide(activeSlide, index)}
                                                sliderWidth={wp("45%")}
                                                itemWidth={wp("45%")}
                                                renderItem={this._renderImages} />

                                            {/* image pagination */}
                                            {this.pagination(item["images"], index)}

                                            {
                                                item["new"] &&

                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        backgroundColor: mowColors.mainColor,
                                                        top: 10,
                                                        left: 10,
                                                        borderRadius: 200,
                                                        width: hp("5%"),
                                                        height: hp("5%"),
                                                        justifyContent: "center"
                                                    }}>

                                                    <Text
                                                        style={{
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: "#ffffff"
                                                        }}>

                                                        {mowStrings.homeScreen.new}

                                                    </Text>

                                                </View>
                                            }

                                            {
                                                !item["stock"] &&

                                                // out of stock view
                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        opacity: 0.8,
                                                        backgroundColor: "#848484",
                                                        width: "100%"
                                                    }}>

                                                    <Text
                                                        style={{
                                                            fontSize: hp("1.8%"),
                                                            fontWeight: "normal",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "center",
                                                            color: "#ffffff"
                                                        }}>

                                                        {mowStrings.homeScreen.outOfStock}

                                                    </Text>

                                                </View>

                                            }

                                        </View>

                                        <View
                                            style={{ height: hp(11.5) }}>

                                            {/* title text */}
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    marginTop: 5,
                                                    fontSize: hp("1.8%"),
                                                    fontWeight: "normal",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "left",
                                                    color: mowColors.titleTextColor,
                                                    fontFamily: fontFamily.regular
                                                }}>

                                                {item["name"]}

                                            </Text>

                                            {/* star view */}
                                            <View
                                                style={{ flexDirection: "row", alignItems: "center", marginTop: 1 }}>

                                                {/* stars*/}
                                                <MowStarView
                                                    score={item["star"]} />

                                                {/* vote count text */}
                                                <Text
                                                    style={{
                                                        marginLeft: 3,
                                                        fontSize: hp("1.5%"),
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: mowColors.textColor,
                                                        fontFamily: fontFamily.regular,
                                                    }}>

                                                    {"("}{item["voteCount"]}{")"}

                                                </Text>

                                            </View>

                                            {/* price & discount view */}
                                            {
                                                item["discountRate"]

                                                    ?

                                                    <View
                                                        style={{ flexDirection: "row", marginTop: 3, alignItems: "center" }}>

                                                        {/* discount rate view */}
                                                        <View
                                                            style={{
                                                                backgroundColor: mowColors.successColor,
                                                                borderRadius: 5,
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                width: hp("5%"),
                                                                height: hp("5%")
                                                            }}>

                                                            <Text
                                                                style={{
                                                                    fontSize: hp("2%"),
                                                                    fontWeight: "bold",
                                                                    fontStyle: "normal",
                                                                    letterSpacing: 0,
                                                                    textAlign: "left",
                                                                    color: "#ffffff"
                                                                }}>

                                                                {item["discountRate"]}

                                                            </Text>

                                                        </View>

                                                        {/* price view */}
                                                        <View
                                                            style={{ marginLeft: 10, marginTop: 3 }}>

                                                            {/* first price text view  */}
                                                            <View
                                                                style={{ alignItems: "center", justifyContent: "center" }}>

                                                                {/* first price text */}
                                                                <Text
                                                                    style={{
                                                                        fontSize: hp("1.8%"),
                                                                        fontWeight: "300",
                                                                        fontStyle: "normal",
                                                                        letterSpacing: 0,
                                                                        textAlign: "center",
                                                                        color: mowColors.textColor,
                                                                        fontFamily: fontFamily.light
                                                                    }}>

                                                                    {item["currency"]}{item["firstPrice"]}

                                                                </Text>

                                                                <View
                                                                    style={{
                                                                        backgroundColor: mowColors.mainColor,
                                                                        width: "100%",
                                                                        height: hp("0.1%"),
                                                                        position: "absolute",
                                                                    }} />

                                                            </View>

                                                            {/* last price text */}
                                                            <Text
                                                                style={{
                                                                    fontSize: hp("2%"),
                                                                    fontWeight: "bold",
                                                                    fontStyle: "normal",
                                                                    letterSpacing: 0,
                                                                    textAlign: "center",
                                                                    color: mowColors.titleTextColor,
                                                                    fontFamily: fontFamily.bold
                                                                }}>

                                                                {item["currency"]}{item["unitprice"]}

                                                            </Text>

                                                        </View>

                                                    </View>

                                                    :

                                                    <Text
                                                        style={{
                                                            fontSize: hp("2%"),
                                                            fontWeight: "bold",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "left",
                                                            color: mowColors.titleTextColor,
                                                            marginTop: 5,
                                                            fontFamily: fontFamily.bold
                                                        }}>

                                                        {item["currency"]}{item["unitprice"]}

                                                    </Text>
                                            }

                                        </View>

                                        {/* add to cart button */}
                                        <MowButtonBasic
                                            onPress={() => { this._addToCart(item) }}
                                            containerStyle={{ marginBottom: 0, marginTop: 10, borderColor: mowColors.textColor }}
                                            textStyle={{ color: mowColors.textColor }}
                                            type={"success"}
                                            size={"small"}
                                            filled={false}>

                                            {mowStrings.button.addToCart}

                                        </MowButtonBasic>

                                    </View>

                                )}
                            />

                        </View>

                        :

                        // list view
                        <View
                            style={{ flex: 1 }}>

                            <FlatList
                                key={this.state.productListKey}
                                keyExtractor={(item, index) => index.toString()}
                                style={{ paddingHorizontal: wp("3%") }}
                                data={this.state.ProductList}
                                renderItem={({ item, index }) => (

                                    //product item
                                    <View
                                        key={index}
                                        style={{ margin: 5, marginVertical: 8, flex: 1, flexDirection: "row", ...borderStyle, height: hp(14), width: "98%", borderRadius: 10 }}>

                                        {/* image view */}
                                        <View
                                            style={{
                                                marginRight: 10,
                                                borderRadius: 10,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>

                                            {/* hearth icon touchable */}
                                            <TouchableOpacity
                                                style={{ position: "absolute", top: 5, right: 5, zIndex: 99 }}>

                                                <FAIcon
                                                    style={{ color: "grey", fontSize: hp("1.5%") }}
                                                    name={"heart"} />

                                            </TouchableOpacity>

                                            {/* product image slider */}
                                            <Carousel
                                                removeClippedSubviews={false}
                                                ref={(c) => { this._carousel = c }}
                                                data={item["images"]}
                                                sliderWidth={wp("30%")}
                                                itemWidth={wp("30%")}
                                                renderItem={this._renderImages} />

                                            {
                                                item["new"] &&

                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        backgroundColor: mowColors.mainColor,
                                                        top: 5,
                                                        left: 5,
                                                        borderRadius: 200,
                                                        width: hp("3.2%"),
                                                        height: hp("3.2%"),
                                                        justifyContent: "center"
                                                    }}>

                                                    <Text
                                                        style={{
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            color: "#ffffff",
                                                            fontSize: hp(1.3)
                                                        }}>

                                                        {mowStrings.homeScreen.new}

                                                    </Text>

                                                </View>
                                            }

                                            {
                                                !item["stock"] &&

                                                // out of stock view
                                                <View
                                                    style={{
                                                        position: "absolute",
                                                        opacity: 0.8,
                                                        backgroundColor: "#848484",
                                                        width: "100%"
                                                    }}>

                                                    <Text
                                                        style={{
                                                            fontSize: hp("1.8%"),
                                                            fontWeight: "normal",
                                                            fontStyle: "normal",
                                                            letterSpacing: 0,
                                                            textAlign: "center",
                                                            color: "#ffffff"
                                                        }}>

                                                        {mowStrings.homeScreen.outOfStock}

                                                    </Text>

                                                </View>

                                            }

                                        </View>

                                        {/* info view */}
                                        <View>

                                            <View
                                                style={{ height: hp(8) }}>

                                                {/* title text */}
                                                <Text
                                                    numberOfLines={1}
                                                    style={{
                                                        marginTop: 1,
                                                        fontSize: hp("1.6%"),
                                                        fontWeight: "normal",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "left",
                                                        color: mowColors.titleTextColor,
                                                        fontFamily: fontFamily.regular
                                                    }}>

                                                    {item["name"]}

                                                </Text>

                                                {/* star view */}
                                                <View
                                                    style={{ flexDirection: "row", alignItems: "center", marginTop: 1 }}>

                                                    {/* stars*/}
                                                    <MowStarView
                                                        width={hp(8)}
                                                        height={hp(1.5)}
                                                        score={item["star"]} />

                                                    {/* vote count text */}
                                                    <Text
                                                        style={{
                                                            marginLeft: 3,
                                                            fontSize: hp("1.3%"),
                                                            letterSpacing: 0,
                                                            textAlign: "left",
                                                            color: mowColors.textColor,
                                                            fontFamily: fontFamily.regular
                                                        }}>

                                                        {"("}{item["voteCount"]}{")"}

                                                    </Text>

                                                </View>

                                                {/* price & discount view */}
                                                {
                                                    item["discountRate"]

                                                        ?

                                                        <View
                                                            style={{ flexDirection: "row", marginTop: 1, alignItems: "center" }}>

                                                            {/* discount rate view */}
                                                            <View
                                                                style={{
                                                                    backgroundColor: mowColors.successColor,
                                                                    borderRadius: 5,
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    width: wp("9%"),
                                                                    height: hp("3.5%")
                                                                }}>

                                                                <Text
                                                                    style={{
                                                                        fontSize: hp("1.6%"),
                                                                        fontWeight: "bold",
                                                                        fontStyle: "normal",
                                                                        letterSpacing: 0,
                                                                        textAlign: "left",
                                                                        color: "#ffffff",
                                                                        fontFamily: fontFamily.bold
                                                                    }}>

                                                                    {item["discountRate"]}

                                                                </Text>

                                                            </View>

                                                            {/* price view */}
                                                            <View
                                                                style={{ marginLeft: 10 }}>

                                                                {/* first price text view  */}
                                                                <View
                                                                    style={{ alignItems: "center", justifyContent: "center" }}>

                                                                    {/* first price text */}
                                                                    <Text
                                                                        style={{
                                                                            fontSize: hp("1.5%"),
                                                                            fontWeight: "300",
                                                                            fontStyle: "normal",
                                                                            letterSpacing: 0,
                                                                            textAlign: "center",
                                                                            color: mowColors.textColor,
                                                                            fontFamily: fontFamily.light
                                                                        }}>

                                                                        {item["currency"]}{item["firstPrice"]}

                                                                    </Text>

                                                                    <View
                                                                        style={{
                                                                            backgroundColor: mowColors.textColor,
                                                                            width: "100%",
                                                                            height: hp("0.1%"),
                                                                            position: "absolute",
                                                                        }} />

                                                                </View>

                                                                {/* last price text */}
                                                                <Text
                                                                    style={{
                                                                        fontSize: hp("1.7%"),
                                                                        fontWeight: "bold",
                                                                        fontStyle: "normal",
                                                                        letterSpacing: 0,
                                                                        textAlign: "center",
                                                                        color: mowColors.titleTextColor,
                                                                        fontFamily: fontFamily.bold
                                                                    }}>

                                                                    {item["currency"]}{item["lastPrice"]}

                                                                </Text>

                                                            </View>

                                                        </View>

                                                        :

                                                        <Text
                                                            style={{
                                                                fontSize: hp("1.8%"),
                                                                fontWeight: "bold",
                                                                fontStyle: "normal",
                                                                textAlign: "left",
                                                                color: mowColors.titleTextColor,
                                                                marginTop: 5,
                                                                fontFamily: fontFamily.bold
                                                            }}>

                                                            {item["currency"]}{item["lastPrice"]}

                                                        </Text>
                                                }

                                            </View>

                                            <View
                                                style={{ width: wp(25), marginTop: hp(0.5) }}>

                                                {/* add to cart button */}
                                                <MowButtonBasic
                                                    containerStyle={{ marginBottom: 0, marginTop: 10, borderColor: mowColors.textColor }}
                                                    textStyle={{ color: mowColors.textColor }}
                                                    onPress={() => { this._addToCart(item) }}
                                                    type={"success"}
                                                    size={"xSmall"}
                                                    filled={false}>

                                                    {mowStrings.button.addToCart}

                                                </MowButtonBasic>

                                            </View>

                                        </View>

                                    </View>

                                )}
                            />

                        </View>

                }

                <MowPicker
                    key={2}
                    pickerTitle={mowStrings.products.orderBy}
                    selectedValue={this.state.pickerSelectedId}
                    onSelect={(obj) => { this._onSelect(obj) }}
                    title={mowStrings.picker.sort.title}
                    search={false}
                    modalVisible={this.state.pickerVisible}
                    onClosed={() => { this.setState({ pickerVisible: false }) }}
                    data={pickerSortData} />

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