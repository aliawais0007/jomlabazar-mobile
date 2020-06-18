import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { mowStrings } from "../../../values/Strings/MowStrings";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { platform } from "../../../values/Constants/MowConstants";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { mowColors } from "../../../values/Colors/MowColors";
import { MowStarView } from "../../../components/ui/Common/StarView/MowStarView";
import { fontFamily, paginationStyle } from "../../../values/Styles/MowStyles";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { _warningDialog, _errorDialog } from "../../../components/ui/Common/Dialog/MowDialogFunctions";
import SyncStorage from "sync-storage";
import WomanClothing from "../../../sampleData/WomanClothing";
import { API_ROOT } from "../../../values/Constants/MowConstants";
import { _showToast } from "../../../components/ui/Common/Toast/MowToast";

let self;

export default class WishList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            favoriteData: [],
            favoriteLenght:0,
            favoriteDataListKey: 0,
            activeIndex: 0,
            isFetched: false,
            activeSlide: []
        };

        self = this;
    }

    componentDidMount() {
        // to set all active index as 0
        // let arr = [];
        // let length = this.state.favoriteData.length;
        // for (let i = 0; i < length; i++){
        //     arr[i] = 0;
        // }
        // this.setState({activeSlide: arr});
        if (SyncStorage.get('isLogin')) {
            this.getWishlistData();
        }
        else {
            let wishList = SyncStorage.get('wishList');
            if (wishList) {
                wishList = JSON.parse(wishList);
            }
            else wishList = [];
            // alert(JSON.stringify(wishList, null, 4));       

            this.setState({
                favoriteData: wishList, favoriteLenght:wishList.length, isFetched: true
            });
        }
    }

    getWishlistData = () => {
        let wishList = [];
        let uid = SyncStorage.get("uid");
        let API = API_ROOT + `JomlahBazar/AdminPanel/controllers/client/CON_Cart.php?userId=${uid}`;
        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else throw response.json();
            })
            .then(responseJson => {
                wishList = [...responseJson];
                wishList.map((product, index) => {
                    product["productId"] = product.productId;
                    product["name"] = product.name;
                    product['stock'] = product.quantity > 0 ? true : false;
                    product['currency'] = "$";
                    product['totalPrice'] = product.unitprice;
                    product['brand'] = product.brand_name;
                    product['images'] = WomanClothing[index].images;
                    product['count'] = 1;
                    product['new'] = false;
                })
                let totalPrice = 0;
                wishList.map(item => {
                    totalPrice = parseInt(totalPrice) + parseInt(item.totalPrice);
                });
                this.setState({ favoriteData: wishList,favoriteLenght:wishList.length, isFetched: true });
            })
            .catch(err => {
                this.setState({
                    isFetched: true
                });

                alert(err);
            });
    }


    _loggedInCartDelete =(id)=>{
        let API = API_ROOT+'JomlahBazar/AdminPanel/controllers/client/CON_Delete_Wishlist.php?';
        API = API + `wishlistId=${id}`;
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
                    _showToast.success("Product Deleted from Favorites");
                  break;
    
                case 1:
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
                  _errorDialog("Error", "Can't add delete from favorites. Please contact support.");
              }
        })

        .catch(err=>alert(err))

    }

    _deleteItemFromFavoriteList(index) {
        // warning dialog to confirm user selection
        _warningDialog("Mowega", mowStrings.alertDialogs.removeFavorite, mowStrings.button.yes, mowStrings.button.no, true)
            .then(() => {
                if(SyncStorage.get('isLogin')){
                    this._loggedInWishlistDelete(product.cartId)
                }
                else{
                    let wishList = this.state.favoriteData;
                    wishList.splice(index, 1);
                    wishList = JSON.stringify(wishList);
                    SyncStorage.set("wishList", wishList);
                    this.setState({ favoriteData: wishList, favoriteDataListKey: this.state.favoriteDataListKey + 1 });
                }
               

           
            });
    }

    _renderImages({ item, index }) {
        return (
            <TouchableOpacity
                onPress={() => { self.props.navigation.navigate("ProductDetail", { product: self.state.favoriteData[index] }) }}
                key={index}>

                <Image
                    style={{ height: "100%", width: "100%", borderRadius: 10 }}
                    resizeMode={"stretch"}
                    source={item["image"]} />

            </TouchableOpacity>
        );
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






    checkDuplicates = (cartItems, product) => {
        let duplicate = [];
        duplicate = cartItems.length > 1 && cartItems.filter(unit => JSON.stringify(unit.productId) === JSON.stringify(product.productId));
        return duplicate;
    }

    _addToCart(product) {
        if (SyncStorage.get('isLogin')) {
            this._handleLoggedInCart(product.productId)
        }


        else {
            let cartItems = SyncStorage.get('cartItems');
            cartItems = JSON.parse(cartItems);
            let duplicates = [];
            duplicates = this.checkDuplicates(cartItems, product);
            this.setState({ duplicate: duplicates })
            if (duplicates.length > 0) {
                alert("Product is already in cart");
                return
            };
            let item = {};
            item["productId"] = product.productId;
            item["name"] = product.name;
            item['stock'] = product.stock
            item['currency'] = product.currency;
            item['price'] = product.unitprice;
            item['totalPrice'] = product.totalPrice;
            item['brand'] = product.brand_name;
            item['images'] = product.images;
            item['count'] = 1;
            cartItems.push(item);
            cartItems = JSON.stringify(cartItems);
            SyncStorage.set('cartItems', cartItems);
            _showToast.success("Product added to Cart");
        }
    }


    _handleLoggedInCart = (productId) => {
        let uid = SyncStorage.get('uid');
        // let formData = new FormData();
        // formData.push('userId',uid);
        // formData.push('productId', productId);
        let API = API_ROOT + 'JomlahBazar/AdminPanel/controllers/client/CON_Add_Cart.php?';
        API = API + `userId=${uid}&productId=${productId}`;
        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else throw response.json();
            })
            .then(responseJson => {
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

    render() {
        const { isFetched, favoriteLenght } = this.state;
        return (

            <MowContainer
            footerActiveIndex={3}
            title={"My Wishlist"}
            navbar={false}
            style={{ backgroundColor: mowColors.pageBGDarkColor }}
               >
  <View
                    style={{
                        height: hp("6%"),
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: 'row',
                        zIndex: 999,
                        backgroundColor: mowColors.mainColor,
                    }}>

                    {/* back button */}
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack(null)}
                        style={{
                            flex: 1.5,
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

                    {/* page title */}
                    <Text
                        style={{
                            flex: 7,
                            fontSize: hp("2%"),
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'center',
                            fontFamily: fontFamily.bold
                        }}>

                        {"My Wishlist"}

                    </Text>

                    {/* user button */}
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.openDrawer() }}
                        style={{ flex: 1.5, alignItems: "center" }}>

                        <FAIcon
                            style={{ fontSize: hp("3%") }}
                            color={"white"}
                            name={'bars'} />

                    </TouchableOpacity>

                </View>

                {!isFetched &&
                    <View style={{ justifyContent: "center", alignItems: "center", height: hp(80) }}>
                        <Text>Loading ...</Text>
                    </View>
                }

                {isFetched && favoriteLenght < 1 &&
                    <View style={{ justifyContent: "center", alignItems: "center", height: hp(80) }}>
                        <Text>No item in the wish list!</Text>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('ProductList',{title:"Product"})}
                        >
                            <Text style={{ color: mowColors.successColor, fontSize: 18, fontWeight: "400" }} >Start Adding Now --{'>'}</Text>
                        </TouchableOpacity>
                    </View>
                }


                {/* product list */}
                <FlatList
                    key={this.state.favoriteDataListKey}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    style={{ paddingHorizontal: wp("3%") }}
                    data={this.state.favoriteData}
                    renderItem={({ item, index }) => (

                        //product item
                        <View
                            key={index}
                            style={{
                                margin: 5,
                                width: wp("45%"),
                            }}>

                            {/* image view */}
                            <View
                                style={{
                                    height: platform === "android" ? hp("25") : hp("21"),
                                    width: "100%",
                                    borderRadius: 10,
                                    justifyContent: "center"
                                }}>

                                {/* hearth icon touchable */}
                                <TouchableOpacity
                                    onPress={() => { this._deleteItemFromFavoriteList(index) }}
                                    style={{ position: "absolute", top: 10, right: 10, zIndex: 99 }}>

                                    <FAIcon
                                        style={{
                                            fontSize: hp("2%"),
                                            color: mowColors.mainColor
                                        }}
                                        name={"heart"} />

                                </TouchableOpacity>

                                {/* favorite item image slider */}
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

                                        {"("}{item["ratting"]}{")"}

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
                                                    backgroundColor: mowColors.mainColor,
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

                                                        {/* {item["currency"]}{item["firstPrice"]} */}

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
                                                        color: mowColors.mainColor,
                                                        fontFamily: fontFamily.bold
                                                    }}>

                                                    {item["currency"]}{item["lastPrice"]}

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

                                            {item["currency"]}{item["totalPrice"]}

                                        </Text>
                                }

                            </View>

                            {/* add to cart button */}
                            <MowButtonBasic
                                onPress={() => { this._addToCart(item) }}
                                textStyle={{ color: mowColors.textColor }}
                                containerStyle={{ marginBottom: 5, borderColor: mowColors.textColor }}
                                type={"success"}
                                size={"small"}
                                filled={false}>

                                {mowStrings.button.addToCart}

                            </MowButtonBasic>

                        </View>

                    )}
                />

            </MowContainer>

        )

    }

}