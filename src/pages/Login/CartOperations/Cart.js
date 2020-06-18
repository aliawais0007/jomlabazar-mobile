import React from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { mowStrings } from "../../../values/Strings/MowStrings";
import { mowColors } from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {
    borderStyle,
    categoryStyleWithoutShadow,
    fontFamily,
} from "../../../values/Styles/MowStyles";
import CartData from "../../../sampleData/CartData";
import { MowButtonBasic } from "../../../components/ui/Common/Button/MowButton";
import { MowInput } from "../../../components/ui/Common/Input/MowInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FAIcon from 'react-native-vector-icons/FontAwesome';
import SyncStorage from "sync-storage";
import WomanClothing from "../../../sampleData/WomanClothing";
import { _warningDialog } from "../../../components/ui/Common/Dialog/MowDialogFunctions";
import { API_ROOT } from "../../../values/Constants/MowConstants";
import { _showToast } from "../../../components/ui/Common/Toast/MowToast";

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartData: [],
            cartLength:0,
            cartDataListKey: 0,
            cartTotal: 0,
            isFetched:false,
            cartItems: null
        };
    }


    cartTotalStyle = {
        rowView: {
            flexDirection: "row",
            justifyContent: "space-between"
        },
        title: {
            color: mowColors.titleTextColor,
            marginRight: 10,
            fontSize: hp(1.6),
            letterSpacing: 0
        },
        content: {
            color: mowColors.textColor,
            marginRight: 10,
            fontSize: hp(1.5),
            fontWeight: "600",
            letterSpacing: 1
        }
    };

    componentDidMount() {
        if (SyncStorage.get('isLogin')) {
            this.getCartData();
        }
        else {
            let cartItems = SyncStorage.get('cartItems');
            if (cartItems) {
                cartItems = JSON.parse(cartItems);
            }
            else cartItems = [];
            // alert(JSON.stringify(cartItems, null, 4));       
            let totalPrice = 0;
            cartItems.map(item => {
                totalPrice = parseInt(totalPrice) + parseInt(item.totalPrice);
            });
            this.setState({
                cartTotal: totalPrice, cartData: cartItems, cartLength:cartItems.length, isFetched:true
            });
        }
    }

    getCartData=()=>{
        let cartItems=[];
        let uid = SyncStorage.get("uid");
        let API = API_ROOT +`JomlahBazar/AdminPanel/controllers/client/CON_Cart.php?userId=${uid}`;
        fetch(API)
        .then(response=>{
            if(response.ok){
                return response.json();
            }else {
                throw response.json();
            }
        })
        .then(responseJson=>{
            cartItems = [...responseJson];
            cartItems.map((product, index)=>{
                product["productId"] = product.productId;
                product["name"] = product.name;
                product['stock'] = product.quantiy >0 ? true : false;
                product['currency'] = "$";
                product['totalPrice'] = product.unitprice;
                product['brand'] = product.brand_name;
                product['images'] = WomanClothing[index].images;
                product['count'] = 1;
            })

            let totalPrice = 0;
            cartItems.map(item => {
                totalPrice = parseInt(totalPrice) + parseInt(item.totalPrice);
            });
            this.setState({cartData:cartItems,  cartLength:cartItems.length, cartTotal: totalPrice, isFetched:true});
        })
        .catch(err=>{
            this.setState({
                isFecthed:true, cartItems:err
            });
            alert("There is some error. Please contact support!")
        });


    }


    _loggedInCartDelete =(id, index)=>{
        let API = API_ROOT+'JomlahBazar/AdminPanel/controllers/client/CON_Delete_Cart.php?';
        API = API + `cartId=${id}`;
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
                    let cartData = this.state.cartData;
                    cartData.splice(index, 1);
                    let totalPrice = 0;
                    cartData.map(item => {
                        totalPrice = parseInt(totalPrice) + parseInt(item.price);
                    });
                    this.setState({
                        cartData: cartData, cartDataListKey: this.state.cartDataListKey + 1, cartTotal: totalPrice
                    })
                    _showToast.success("Product Deleted from Cart.");

                  break;
                case 1:
                  /*Error*/
                  /*similate 2s delay*/
                  setTimeout(function () {
                    _errorDialog(
                      "Error",
                      "Missing required Parameters. Please try again."
                    );
                  }, 2000);
                  break;
                default:
                  _errorDialog("Error", "Can't add product to cart. Please contact support.");
              }
        })

        .catch(err=>alert(err))
    }

    _deleteItemFromCart(index, product) {
        if(SyncStorage.get('isLogin')){
            this._loggedInCartDelete(product.cartId, index)
        }
        else{
            let cartData = this.state.cartData;
            cartData.splice(index, 1);
            let totalPrice = 0;
            cartData.map(item => {
                totalPrice = parseInt(totalPrice) + parseInt(item.price);
            });
            if(!SyncStorage.get('isLogin')){
            let cartItems = [];
            cartItems = JSON.stringify(cartData);
            SyncStorage.set("cartItems", cartItems);
            this.setState({ cartData: cartData, cartDataListKey: this.state.cartDataListKey + 1, cartTotal: totalPrice });
            }
        }
    }

    _calculateTotalPrice(flag, index) {

        let count = this.state.cartData[index]["count"];

        // +1 product
        if (flag) {
            count++;
            this._updateProductCount(count, index);
        }
        // -1 product
        else {
            if (count !== 1) {
                count--;

                this._updateProductCount(count, index);
            }
        }
    }

    // to update product count according to the user value
    _updateProductCount(value, index) {

        // the value that entered by user
        value = Number(value);

        let newArray = [...this.state.cartData];

        // to update product count according to the value
        newArray[index]["count"] = value;

        // to update new array with new product cost
        newArray = this._updateProductCost(index, newArray, value);

        let totalPrice = 0;
        for (let i in newArray) {
            let price = Number(newArray[i]["totalPrice"]);
            totalPrice += price;
        }


        // let cartItems = [...newArray];
        // cartItems = JSON.stringify(cartItems);
        // SyncStorage.set("cartItems", cartItems);
        this.setState({
            cartData: newArray,
            cartTotal: totalPrice
        });

    }

    // to update product total cost
    _updateProductCost(index, productArr, count) {

        // to get product product price

        let price = parseInt(productArr[index]["price"]);

        // to calculate new product total price and update
        productArr[index]["totalPrice"] = (price * count);

        // return new product array
        return productArr;
    }

    _handleCompleteShopping = () => {
        if (SyncStorage.get('isLogin')) {
            this.props.navigation.navigate("AddressList", { cart: true });
        }
        else {
            _warningDialog("Alert", "Please login to complete your order.")
            this.props.navigation.navigate("NormalLogin", { cartRedirect: true });
        }
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


    _handleLoggedInCart=(productId)=>{
        let uid = SyncStorage.get('uid');
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


    render() {
        const {isFetched, cartLength} = this.state;
        return (

            <MowContainer
                footerActiveIndex={3}
                title={mowStrings.cart}
                navbar={false}
                style={{ backgroundColor: mowColors.pageBGDarkColor }}>

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

                        {"My Cart"}

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
                <View style={{justifyContent:"center", alignItems:"center", height:hp(80)}}>
                    <Text>Loading ...</Text>
                    
                </View>
                }

                {isFetched && cartLength < 1 &&
                <View style={{justifyContent:"center", alignItems:"center", height:hp(80)}}>
                    <Text>No item in the cart!</Text>
                    <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('ProductList',{title:"Product"})}
                        >
                            <Text style={{ color: mowColors.successColor, fontSize: 18, fontWeight: "400" }} >Start Adding Now --{'>'}</Text>
                        </TouchableOpacity>
                </View>
                }

                <KeyboardAwareScrollView
                    style={{ marginBottom: hp("7%") }}>

                    <FlatList
                        key={this.state.cartDataListKey}
                        style={{ marginTop: -5 }}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.cartData}
                        renderItem={({ item, index }) => (

                            <View
                                key={index}
                                style={[categoryStyleWithoutShadow, {
                                    flexDirection: "row",
                                    marginVertical: 5,
                                    backgroundColor: mowColors.viewBGColor,
                                    padding: 10
                                }]}>

                                <View
                                    style={{
                                        flex: 1.5,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>

                                    <Image
                                        resizeMode={"contain"}
                                        style={{ width: hp("10%"), height: hp("10%") }}
                                        source={item["images"][0].image} />

                                </View>

                                <View
                                    style={{ flex: 4, marginLeft: 10 }}>

                                    {/* product title text */}
                                    <Text
                                        style={{
                                            fontSize: hp("1.8%"),
                                            fontWeight: "600",
                                            fontStyle: "normal",
                                            textAlign: "left",
                                            color: mowColors.titleTextColor,
                                            marginBottom: 10,
                                            paddingRight: 5,
                                            fontFamily: fontFamily.semiBold
                                        }}>

                                        {item["name"]}

                                    </Text>

                                    <View
                                        style={{ alignItems: "center", flexDirection: "row" }}>

                                        {/* price view */}
                                        <View
                                            style={{ flex: 1.5 }}>

                                            <Text
                                                style={{
                                                    fontSize: hp("2%"),
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "left",
                                                    color: mowColors.titleTextColor,
                                                    fontFamily: fontFamily.bold
                                                }}>

                                                {item["currency"]}{item["totalPrice"]}

                                            </Text>

                                        </View>

                                        <View
                                            style={{ flex: 3, flexDirection: "row", alignItems: "center", alignSelf: "center", justifyContent: "center" }}>

                                            {/* minus button view */}
                                            <TouchableOpacity
                                                onPress={() => { this._calculateTotalPrice(false, index) }}
                                                style={minusPlusStyle.container}>

                                                <Text
                                                    style={minusPlusStyle.text}>

                                                    -

                                                </Text>

                                            </TouchableOpacity>

                                            {/* product count text */}
                                            <Text
                                                style={{
                                                    fontSize: hp("2%"),
                                                    fontWeight: "600",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "center",
                                                    color: mowColors.titleTextColor,
                                                    marginHorizontal: 15,
                                                    fontFamily: fontFamily.semiBold
                                                }}>

                                                {item["count"]}

                                            </Text>

                                            {/* plus button view*/}
                                            <TouchableOpacity
                                                onPress={() => { this._calculateTotalPrice(true, index) }}
                                                style={minusPlusStyle.container}>

                                                <Text
                                                    style={minusPlusStyle.text}>

                                                    +

                                                </Text>

                                            </TouchableOpacity>

                                        </View>

                                        <TouchableOpacity
                                            onPress={() => { this._deleteItemFromCart(index, item) }}
                                            style={{ flex: 1 }}>

                                            <FeatherIcon
                                                style={{
                                                    textAlign: "center",
                                                    color: mowColors.mainColor,
                                                    fontSize: hp("2.5%")
                                                }}
                                                name={"trash-2"} />

                                        </TouchableOpacity>

                                    </View>

                                </View>

                            </View>

                        )}
                    />

                    {/* coupon view */}
                    {/* <View
                        style={{
                            flexDirection: "row",
                            backgroundColor: mowColors.viewBGColor,
                            borderRadius: 5,
                            alignSelf: "center",
                            height: hp("5.5%"),
                            marginVertical: hp("1%"),
                            width: "90%"
                        }}>

                        <MowInput
                            containerStyle={{flex: 3, borderWidth: 0, backgroundColor: "transparent"}}
                            iconColor={"#b6babe"}
                            textInputStyle={{fontFamily: fontFamily.regular}}
                            placeholder={mowStrings.placeholder.couponCode}
                            leftIcon={"percent"}/>

                        <MowButtonBasic
                            containerStyle={{flex: 1, backgroundColor: mowColors.mainColor}}
                            size={"small"}
                            type={"success"}>

                            {mowStrings.button.apply}

                        </MowButtonBasic>

                    </View>
 */}
                </KeyboardAwareScrollView>

                <View
                    style={{ width: "90%", alignSelf: "center", alignItems: "center" }}>

                    {/* cart total ui */}
                    <View
                        style={{
                            backgroundColor: mowColors.viewBGColor,
                            flexDirection: "row",
                            width: "100%",
                            borderRadius: 5,
                            padding: 10
                        }}>

                        <View
                            style={{ flex: 1 }}>

                            {/* sub-total row view */}
                            <View
                                style={this.cartTotalStyle.rowView}>

                                {/* sub-total text */}
                                <Text
                                    style={this.cartTotalStyle.title}>

                                    {mowStrings.cartScreen.subtotal}:

                                </Text>

                                {/* sub-total amount text */}
                                <Text
                                    style={this.cartTotalStyle.content}>

                                    ${this.state.cartTotal}

                                </Text>

                            </View>

                            {/* coupon row view */}
                            <View
                                style={this.cartTotalStyle.rowView}>

                                {/* coupon text */}
                                <Text
                                    style={this.cartTotalStyle.title}>

                                    {mowStrings.cartScreen.coupon}:

                                </Text>

                                {/* coupon amount text */}
                                <Text
                                    style={this.cartTotalStyle.content}>

                                    $0

                                </Text>

                            </View>

                            {/* shipping row view */}
                            <View
                                style={this.cartTotalStyle.rowView}>

                                {/* sub total text */}
                                <Text
                                    style={this.cartTotalStyle.title}>

                                    {mowStrings.cartScreen.shipping}:

                                </Text>

                                {/* sub total amount text */}
                                <Text
                                    style={this.cartTotalStyle.content}>

                                    $0

                                </Text>

                            </View>

                        </View>

                        {/* total price view */}
                        <View
                            style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>

                            <Text
                                style={{
                                    color: mowColors.mainColor,
                                    marginRight: 10,
                                    fontSize: hp(2),
                                    fontWeight: "bold",
                                    letterSpacing: 1
                                }}>

                                ${this.state.cartTotal}

                            </Text>

                        </View>

                    </View>

                    <MowButtonBasic
                        onPress={() => this._handleCompleteShopping()}
                        type={"success"}>

                        {mowStrings.button.completeShopping}

                    </MowButtonBasic>

                </View>

            </MowContainer>

        )

    }

}

const minusPlusStyle = ({
    container: {
        borderRadius: 3,
        backgroundColor: "#ffffff",
        ...borderStyle,
        alignItems: "center",
        justifyContent: "center",
        width: hp("3%"),
        height: hp("3%"),
    },
    text: {
        fontSize: hp("2%"),
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#707070",
    }
});