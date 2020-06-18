import React from "react";
import {View, Text, Image, ScrollView, TouchableOpacity, FlatList} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import {borderStyle, categoryStyleWithoutShadow} from "../../../values/Styles/MowStyles";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";
import {MowButtonBasic} from "../../../components/ui/Common/Button/MowButton";
import Colors from "../../../sampleData/Colors";
import BodySize from "../../../sampleData/BodySize";
import {MowStarView} from "../../../components/ui/Common/StarView/MowStarView";
import CustomerComments from "../../../sampleData/CustomerComments";

export default class ProductDetail extends React.Component {

    ratingView = {
        row: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        icon: {
            color: mowColors.textColor,
            fontSize: hp("3%")
        },
        text: {
            marginTop: 3,
            fontSize: hp("1.8%"),
            fontWeight: "500",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "center",
            color: mowColors.titleTextColor
        }
    };

    state = {
        product: [],
        colorArr: [],
        colorListKey: 0,
        sizeArr: [],
        sizeListKey: 0,
        showMore: false,
        commentListKey: 0
    };

    _handleSizeSelection(index) {
        let sizeArr = this.state.sizeArr;

        let length = BodySize.length;

        for (let i = 0; i < length; i++) {
            if (i != index) {
                // to set false all array values except selected index
                sizeArr[i] = false;
            }
        }

        // to update selected item as its opposite
        sizeArr[index] = !sizeArr[index];

        this.setState({sizeArr: sizeArr, sizeListKey: this.state.sizeListKey + 1})
    }

    _handleColorSelection(index) {
        let colorArr = this.state.colorArr;

        let length = Colors.length;

        for (let i = 0; i < length; i++) {
            if (i != index) {
                // to set false all array values except selected index
                colorArr[i] = false;
            }
        }

        // to update selected item as its opposite
        colorArr[index] = !colorArr[index];

        this.setState({colorArr: colorArr, colorListKey: this.state.colorListKey + 1})
    }

    _commentRow(item) {

        return(

            <View
                style={{
                    marginVertical: 5,
                    borderRadius: 5,
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "rgba(146, 146, 146, 0.41)",
                    padding: 5
                }}>

                <View
                    style={{flexDirection: "row"}}>

                    {/* image view */}
                    <Image
                        style={{
                            width: hp("5%"),
                            height: hp("5%"),
                        }}
                        resizeMode={"contain"}
                        source={item["image"]}/>

                    <View
                        style={{marginLeft: 10}}>

                        {/* name text */}
                        <Text
                            style={{
                                fontSize: hp("1.8%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.titleTextColor
                            }}>

                            {item["name"]}

                        </Text>

                        {/* date text */}
                        <Text
                            style={{
                                fontSize: hp("1.4%"),
                                fontWeight: "normal",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                textAlign: "left",
                                color: mowColors.textColor
                            }}>

                            {item["date"]}

                        </Text>

                    </View>

                    <View
                        style={{marginLeft: 10, justifyContent: "center"}}>

                        {/* star view */}
                        <MowStarView
                            score={item["score"]}/>

                    </View>

                </View>

                {/* description text */}
                <Text
                    style={{
                        marginTop: 5,
                        fontSize: hp("1.5%"),
                        fontWeight: "300",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "left",
                        color: mowColors.textColor
                    }}>

                    {item["description"]}

                </Text>

            </View>

        )

    }

    render() {

        const product = this.state.product;

        return(

            <MowContainer
                style={{backgroundColor: mowColors.pageBGDarkColor}}
                title={mowStrings.productDetail.title}>

                <ScrollView>

                    {/* product info view */}
                    <View
                        style={[categoryStyleWithoutShadow, {backgroundColor: mowColors.categoryBGColor}]}>

                        {/* product name text */}
                        <Text
                            style={{
                                marginVertical: 10,
                                width: "100%",
                                textAlign: "center",
                                fontSize: hp("2.2%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                color: mowColors.titleTextColor

                            }}>

                            {product["title"]}

                        </Text>

                        {/* shipping info text */}
                        <Text
                            style={{
                                marginBottom: 10,
                                width: "100%",
                                textAlign: "center",
                                fontSize: hp("1.6%"),
                                fontWeight: "600",
                                fontStyle: "normal",
                                letterSpacing: 0,
                                color: "#48b500"
                            }}>

                            {mowStrings.productDetail.freeShippingInfo}

                        </Text>

                        {/* image swiper view */}
                        <View
                            style={{height: hp("42%")}}>

                            {/* product image swiper */}
                            <Swiper
                                ref='swiper'
                                pagingEnabled={true}
                                showsPagination={true}
                                horizontal={true}
                                loop={false}
                                dotColor={"grey"}
                                activeDotColor={mowColors.mainColor}
                                paginationStyle={{bottom: hp("1%")}}
                                autoplay={false}>

                                {
                                    product.length >0 && product["images"].map((item, key) => {

                                        return (

                                            <Image
                                                key={key}
                                                style={{
                                                    height: hp("38%"),
                                                    width: "100%",
                                                }}
                                                resizeMode={"contain"}
                                                source={item["image"]}/>

                                        )

                                    })
                                }

                            </Swiper>

                        </View>

                    </View>

                    {/* content view */}
                    <View>

                        {/* body size view */}
                        <View
                            style={[categoryStyleWithoutShadow, {marginTop: 15, backgroundColor: mowColors.categoryBGColor}]}>

                            {/* body size text */}
                            <Text
                                style={{
                                    marginBottom: 10,
                                    fontSize: hp("1.8%"),
                                    fontWeight: "600",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: mowColors.titleTextColor
                                }}>

                                {mowStrings.productDetail.bodySize}

                            </Text>

                            {/* body size list view */}
                            <FlatList
                                key={this.state.sizeListKey}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={BodySize}
                                renderItem={({ item, index }) => (

                                    <TouchableOpacity
                                        onPress={() => {this._handleSizeSelection(index)}}
                                        style={{
                                            width: hp("4%"),
                                            height: hp("4%"),
                                            borderRadius: 3,
                                            marginLeft: index != 0 ? 10 : 0,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: this.state.sizeArr[index] ? mowColors.mainColor : "#ffffff",
                                            ...borderStyle,
                                            marginRight: 1
                                        }}
                                        key={index}>

                                        <Text
                                            style={{
                                                color: this.state.sizeArr[index] ? "white" : mowColors.mainColor,
                                                fontSize: hp("1.5%"),
                                                fontWeight: "600",
                                                fontStyle: "normal",
                                                letterSpacing: 0,
                                                textAlign: "center",
                                            }}>

                                            {item["size"]}

                                        </Text>

                                    </TouchableOpacity>

                                )}
                            />

                        </View>

                        {/* color view */}
                        <View
                            style={[categoryStyleWithoutShadow, {marginTop: 15, backgroundColor: mowColors.categoryBGColor}]}>

                            {/* color text */}
                            <Text
                                style={{
                                    marginBottom: 10,
                                    fontSize: hp("1.8%"),
                                    fontWeight: "600",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: mowColors.titleTextColor
                                }}>

                                {mowStrings.productDetail.color}

                            </Text>

                            {/* color list */}
                            <FlatList
                                key={this.state.colorListKey}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={Colors}
                                renderItem={({ item, index }) => (

                                    <TouchableOpacity
                                        onPress={() => {this._handleColorSelection(index)}}
                                        style={{
                                            width: hp("4%"),
                                            height: hp("4%"),
                                            borderRadius: 3,
                                            backgroundColor: item["color"],
                                            marginLeft: index != 0 ? 10 : 0,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginRight: 1
                                        }}
                                        key={index}>

                                        {
                                            this.state.colorArr[index] &&

                                            <FAIcon
                                                style={{color: "white", fontSize: hp("2.5%")}}
                                                name={"check"}/>
                                        }

                                    </TouchableOpacity>

                                )}
                            />

                        </View>

                        {/* discount rate & price & add to cart button */}
                        <View
                            style={[categoryStyleWithoutShadow, {flexDirection: "row", alignItems: "center", marginTop: 15, backgroundColor: mowColors.categoryBGColor}]}>

                            {
                                product["discountRate"]

                                ?

                                    //price & discount view
                                    <View
                                        style={{flexDirection: "row", alignItems: "center", flex: 1}}>

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

                                                {product["discountRate"]}

                                            </Text>

                                        </View>

                                        {/* price view */}
                                        <View
                                            style={{marginLeft: 10}}>

                                            {/* first price text view  */}
                                            <View
                                                style={{alignItems: "center", justifyContent: "center"}}>

                                                {/* first price text */}
                                                <Text
                                                    style={{
                                                        fontSize: hp("1.8%"),
                                                        fontWeight: "300",
                                                        fontStyle: "normal",
                                                        letterSpacing: 0,
                                                        textAlign: "center",
                                                        color: "#c2c2c2"
                                                    }}>

                                                    {product["currency"]}{product["firstPrice"]}

                                                </Text>

                                                <View
                                                    style={{
                                                        backgroundColor: mowColors.mainColor,
                                                        width: "100%",
                                                        height: hp("0.1%"),
                                                        position: "absolute",
                                                    }}/>

                                            </View>

                                            {/* last price text */}
                                            <Text
                                                style={{
                                                    marginTop: 1,
                                                    fontSize: hp("2%"),
                                                    fontWeight: "bold",
                                                    fontStyle: "normal",
                                                    letterSpacing: 0,
                                                    textAlign: "center",
                                                    color: mowColors.mainColor
                                                }}>

                                                {product["currency"]}{product["lastPrice"]}

                                            </Text>

                                        </View>

                                    </View>

                                :

                                    //price text
                                    <Text
                                        style={{
                                            flex: 1,
                                            fontSize: hp("2.5%"),
                                            fontWeight: "bold",
                                            fontStyle: "normal",
                                            letterSpacing: 0,
                                            textAlign: "left",
                                            color: "#575757"
                                        }}>

                                        {product["currency"]}{product["lastPrice"]}

                                    </Text>
                            }


                            {/* button view */}
                            <View
                                style={{flex: 1}}>

                                <MowButtonBasic
                                    containerStyle={{margin: 0, height: hp(5)}}
                                    onPress={() => {this.props.navigation.navigate("Cart")}}
                                    leftIconStyle={{fontSize: hp("2.5%")}}
                                    textStyle={{fontSize: hp("1.5%")}}
                                    stickyIcon={true}
                                    leftIcon={"shopping-cart"}
                                    size={"small"}
                                    type={"success"}>

                                    {mowStrings.button.addToCart}

                                </MowButtonBasic>

                            </View>

                        </View>

                        {/* product feature view */}
                        <View
                            style={[categoryStyleWithoutShadow, {marginTop: 15, backgroundColor: mowColors.categoryBGColor}]}>

                            <Text
                                style={{
                                    fontSize: hp("1.8%"),
                                    fontWeight: "600",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: mowColors.titleTextColor
                                }}>

                                {mowStrings.productDetail.productFeature}

                            </Text>

                            {/* product feature text */}
                            <Text
                                style={{
                                    marginTop: 2,
                                    fontSize: hp("1.6%"),
                                    fontWeight: "300",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: mowColors.textColor
                                }}>

                                {product["productFeature"]}

                            </Text>

                        </View>

                        {/* like report share view */}
                        <View
                            style={[categoryStyleWithoutShadow, {marginTop: 15, flexDirection: "row", backgroundColor: mowColors.categoryBGColor}]}>

                            {/* like button */}
                            <TouchableOpacity
                                style={this.ratingView.row}>

                                {/* like icon */}
                                <FAIcon
                                    name={"heart"}
                                    style={this.ratingView.icon}/>

                                {/* like text */}
                                <Text
                                    style={this.ratingView.text}>

                                    {mowStrings.productDetail.like}

                                </Text>

                            </TouchableOpacity>

                            {/* report button */}
                            <TouchableOpacity
                                style={this.ratingView.row}>

                                {/* report icon */}
                                <FAIcon
                                    name={"info-circle"}
                                    style={this.ratingView.icon}/>

                                {/* report text */}
                                <Text
                                    style={this.ratingView.text}>

                                    {mowStrings.productDetail.report}

                                </Text>

                            </TouchableOpacity>

                            {/* share button */}
                            <TouchableOpacity
                                style={this.ratingView.row}>

                                {/* share icon */}
                                <FAIcon
                                    name={"share"}
                                    style={this.ratingView.icon}/>

                                {/* share text */}
                                <Text
                                    style={this.ratingView.text}>

                                    {mowStrings.productDetail.share}

                                </Text>

                            </TouchableOpacity>

                        </View>

                        {/* comment list view */}
                        <View
                            style={[categoryStyleWithoutShadow, {marginTop: 15, backgroundColor: mowColors.categoryBGColor}]}>

                            {/* title text  */}
                            <Text
                                style={{
                                    fontSize: hp("1.8%"),
                                    fontWeight: "600",
                                    fontStyle: "normal",
                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: mowColors.titleTextColor
                                }}>

                                {mowStrings.productDetail.customerComments} (1681)

                            </Text>

                            {/* comment list */}
                            <FlatList
                                key={this.state.commentListKey}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                data={CustomerComments}
                                renderItem={({ item, index }) => (

                                    <View>

                                        {
                                            index == 0 &&

                                                <View
                                                    key={index}>

                                                    {this._commentRow(item, index)}

                                                </View>
                                        }

                                        {
                                            (index != 0 && this.state.showMore) &&

                                            <View
                                                key={index}>

                                                {this._commentRow(item, index)}

                                            </View>
                                        }

                                    </View>

                                )}
                            />

                            {/* show more button */}
                            <TouchableOpacity
                                onPress={() => this.setState({showMore: true, commentListKey: this.state.commentListKey + 1})}
                                style={{alignSelf: "center", marginTop: 5, alignItems: "center", justifyContent: "center"}}>

                                <Text
                                    style={{
                                        fontSize: hp("1.7%"),
                                        color: mowColors.mainColor,
                                        fontWeight: "500",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                    }}>

                                    {mowStrings.productDetail.showMore}

                                </Text>

                                <FAIcon
                                    name={"chevron-down"}
                                    style={{
                                        color: mowColors.mainColor,
                                        fontSize: hp("2%")
                                    }}/>

                            </TouchableOpacity>

                        </View>

                    </View>

                </ScrollView>

            </MowContainer>

        )

    }

}