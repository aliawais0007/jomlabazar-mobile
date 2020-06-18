import React from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
  AsyncStorage
} from "react-native";
// import Swiper from "react-native-swiper";
import { mowColors } from "../../values/Colors/MowColors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MowContainer from "../../components/ui/Core/Container/MowContainer";
import { mowStrings } from "../../values/Strings/MowStrings";
import { MowTitleView } from "../../components/ui/MowTitleView";
import {
  categoryStyle,
  fontFamily,
  gPadding,
} from "../../values/Styles/MowStyles";
import searchTypes from "../../sampleData/TrendCategories";
// import TrendCampaign from "../../sampleData/Campaign/TrendCampaign";
import { MowButtonBasic } from "../../components/ui/Common/Button/MowButton";
import FAIcon from "react-native-vector-icons/FontAwesome";
// import TodaysBestDiscounts from "../../sampleData/TodaysBestDiscounts";
// import BestSeller from "../../sampleData/BestSeller";
import { MowStarView } from "../../components/ui/Common/StarView/MowStarView";
import Advantages from "../../sampleData/Advantages";
// import SmartPhones from "../../sampleData/SmartPhones";
// import CarAccessories from "../../sampleData/CarAccessories";
// import { MowCountDown } from "../../components/ui/Common/CountDown/MowCountDown";
import TrendBrands from "../../sampleData/TrendBrands";
import { API_ROOT } from "../../values/Constants/MowConstants";
import WomanClothing from "../../sampleData/WomanClothing";
import { SliderBox } from "react-native-image-slider-box";
import SyncStorage from "sync-storage";
import slider_1 from "../../assets/image/slider_1.jpeg";
import slider_2 from "../../assets/image/slider_2.jpeg";
import slider_3 from "../../assets/image/slider_3.jpeg";
import slider_4 from "../../assets/image/slider_4.jpeg";

const images = [
    slider_1, slider_2, slider_3, slider_4
  ];

const BestSeller_API =
  API_ROOT +
  "JomlahBazar/AdminPanel/controllers/client/CON_BestSellerProducts.php";
const DealOfWeek_API =
  API_ROOT + "JomlahBazar/AdminPanel/controllers/client/CON_DealOfWeek.php";
const FeaturedProducts_API =
  API_ROOT +
  "JomlahBazar/AdminPanel/controllers/client/CON_FeaturedProducts.php";
const LatestProducts_API =
  API_ROOT + "JomlahBazar/AdminPanel/controllers/client/CON_LatestProducts.php";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredProducts: [],
      bestSellers: [],
      dealOfWeek: [],
      latestProducts: [],
      categories: [],
      countryName: "",
      data: null,
      isAuthenticated:false,
    };
  }

  fetchBestSeller = () => {
    fetch(BestSeller_API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else throw response.json();
      })
      .then((responseJson) => {
        responseJson.map((item) => {
          item["image"] = WomanClothing[0].images[0].image;
          item["stock"] = true;
          item["currency"] = "$";
          item["new"] = false;
          item["discountRate"] = null;
        });
        this.setState({
          bestSellers: responseJson,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  fetchDealOfWeek = () => {
    fetch(DealOfWeek_API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else throw response.json();
      })
      .then((responseJson) => {
        responseJson.map((item) => {
          item["image"] = WomanClothing[0].images[0].image;
          item["stock"] = true;
          item["currency"] = "$";
          item["new"] = false;
          item["discountRate"] = null;
        });
        this.setState({
          dealOfWeek: responseJson,
        });
      })
      .catch((err) => alert(err));
  };

  fetchFeaturedProducts = () => {
    fetch(FeaturedProducts_API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else throw response.json();
      })
      .then((responseJson) => {
        responseJson.map((item) => {
          item["image"] = WomanClothing[0].images[0].image;
          item["stock"] = true;
          item["currency"] = "$";
          item["new"] = false;
          item["discountRate"] = null;
        });
        this.setState({
          featuredProducts: responseJson,
        });
      })
      .catch((err) => alert(err));
  };

  fetchLatestProducts = () => {
    fetch(LatestProducts_API)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else throw response.json();
      })
      .then((responseJson) => {
        responseJson.map((item) => {
          item["image"] = WomanClothing[0].images[0].image;
          item["stock"] = true;
          item["currency"] = "$";
          item["new"] = false;
          item["discountRate"] = null;
        });
        this.setState({
          latestProducts: responseJson,
        });
      })
      .catch((err) => alert(Object.keys(err)[0]));
  };

  fetchLocation = () => {
    fetch(
      API_ROOT + "JomlahBazar/AdminPanel/controllers/client/CON_Location.php",
      {
        method: "get",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        this.setState({
          data: response,
        });
        if (response.ok) {
          return response.json();
        } else throw response.json();
      })
      .then((data) => {
        this.setState({
          countryName: data.country,
        });
      })
      .catch((err) => alert(err));
  };

  fetchData = async () => {
    await this.fetchLocation();
    await this.fetchBestSeller();
    await this.fetchDealOfWeek();
    await this.fetchFeaturedProducts();
    await this.fetchLatestProducts();
  };

  componentDidMount() {
    if(SyncStorage.get('email') || SyncStorage.get('isLogin') ){
        this.setState({
            isAuthenticated:true
        })
    }
    this.fetchData();
  }


  _handleLogIn=()=> {
    this.props.navigation.navigate('NormalLogin');
  } 

  _handleCreateNewAccount=()=>{
    this.props.navigation.navigate('NormalRegister');
  }

  handleSearchFor=(item)=>{
if(item['title'].toLowerCase()==='location'){
  this.props.navigation.navigate("Location", {item:item["title"], search_by:item['title']});
}
else this.props.navigation.navigate("SearchType", {item:item["title"], search_by:item['title']});
  }
  render() {
    return (
      <MowContainer footerActiveIndex={1} navbar={false}>
        {/* home screen navbar */}
        <View
          style={[
            {
              paddingHorizontal: gPadding,
              paddingTop: 5,
              backgroundColor: mowColors.mainColor,
              flexDirection: "row",
            },
          ]}
        >
          <TouchableOpacity
           onPress={() => this.props.navigation.openDrawer()}
          >
          <FAIcon
            style={{ fontSize: hp("4%"), marginTop:15 }}
            color={"white"}
            name={"bars"}
          />
        </TouchableOpacity>
          {/* user button */}

          {/* logo with text */}
          <Image
            source={require("../../assets/logo/logo_with_text_colorful.png")}
            style={{ height: hp("9%"), width:140,marginLeft:10}}
            resizeMode={"contain"}
            />

<Text
            style={{
              marginLeft: 30,
              marginTop:10,
              fontSize: hp("1.5%"),
              fontWeight: "400",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "right",
              color: "#ffffff",
            }}
          >
           <Image
            source={require("../../assets/icon/ic_location.png")}
            style={{ width: 20, height: 30, paddingRight:10 }}
          /> {this.state.countryName ? this.state.countryName: "...."}
          </Text>

          {/* <Text
            style={{
              marginTop: 5,
              marginLeft: 15,
              fontSize: hp("1.4%"),
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            JomlaBazar
          </Text> */}
        </View>

        {/* search view */}
        <View
          style={{
            backgroundColor: mowColors.mainColor,
            paddingHorizontal: gPadding,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: hp("0%"),
          }}
        >
          {/* search button */}
          <MowButtonBasic
            onPress={() => {
              this.props.navigation.navigate("HomeFilter");
            }}
            containerStyle={{
              width: "95%",
              alignSelf: "flex-end",
              borderRadius: 5,
              height: hp("5%"),
            }}
            textStyle={{
              padding: 0,
              margin: 0,
              color: "#aeaeae",
              fontSize: hp("1.6%"),
              fontFamily: fontFamily.light,
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
            }}
            leftIconStyle={{ color: "#aeaeae" }}
            leftIcon={"search"}
          >
            {"Search for products, brands, supplier or buyer"}
          </MowButtonBasic>

          {/* <TouchableOpacity
                    onPress={() => {this.props.navigation.openDrawer()}}
                    style={{flex: 1.5, alignItems: "flex-start"}}>

                    <FAIcon
                        style={{fontSize: hp("3%")}}
                        color={"white"}
                        name={'bars'}/>

                </TouchableOpacity>*/}
        </View>
        {/* <View
          style={{
            paddingLeft: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 10,
            backgroundColor: mowColors.mainColor,
          }}
        >
          <Image
            source={require("../../assets/icon/ic_location.png")}
            style={{ width: 20, height: 30 }}
          />
          
        </View> */}

        <ScrollView>
          {/* trend categories view */}
          <View
            style={[
              categoryStyle,
              {
                paddingBottom: hp(1),
                backgroundColor: mowColors.categoryBGColor,
              },
            ]}
          >
            {/* trend categories title view */}
            <MowTitleView showButton={false} title={"Search For"} />

            {/* trend categories horizontal list */}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={searchTypes}
              renderItem={({ item, index }) => (
                // category item touchable
                <TouchableOpacity
                  onPress={() => {
                    this.handleSearchFor(item)
                  }}                
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    width: hp("10%"),
                    height: hp("10%"),
                    marginRight: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  {/* category image */}
                  <Image
                    style={{ width: hp("7%"), height: hp("6%") }}
                    source={item["image"]}
                    resizeMode={"contain"}
                  />

                  {/* category text */}
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: hp("1.4%"),
                      fontWeight: "bold",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      textAlign: "center",
                      color: "black",
                    }}
                  >
                    {item["title"]}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Slider */}
          <View style={{ paddingTop:10, backgroundColor:mowColors.transparent }}>
            <SliderBox autoplay={true} circleLoop={true} images={images} />
          </View>

<View>
         {!this.state.isAuthenticated && <View style={{ backgroundColor: "white", padding: 15 }}>
            <Text style={{ fontSize: 20, marginLeft:10}}>
              Sign in for the best experience
            </Text>
            <MowButtonBasic
            onPress={() => {
              this._handleLogIn();
            }}
            containerStyle={{
              width: "95%",
              alignSelf: "flex-end",
              borderRadius: 5,
              height: hp("5%"),
              backgroundColor:mowColors.successColor
            }}
            textStyle={{
              padding: 0,
              margin: 0,
              color: "white",
              fontSize: hp("2%"),
              fontFamily: fontFamily.light,
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "left",
            }}
          >
            {"Sign in"}
          </MowButtonBasic>
          <TouchableOpacity 
            onPress={()=>this._handleCreateNewAccount()}
          >
          <Text style={{color:mowColors.successColor, fontSize:16, marginLeft:10}}>Create new account</Text>
          </TouchableOpacity>
          </View>
  }
  </View>

          {/* trend brands view */}
          <View
            style={[
              categoryStyle,
              { marginTop: 15, backgroundColor: mowColors.categoryBGColor },
            ]}
          >
            {/* trend brands title view */}
            <MowTitleView
              showButton={false}
              title={mowStrings.homeScreen.trendBrands}
            />

            {/* trend brands horizontal list */}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={TrendBrands}
              renderItem={({ item, index }) => (
                // trend brands item touchable
                <TouchableOpacity
                  style={{
                    width: wp("30%"),
                    height: hp("8%"),
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "rgba(146, 146, 146, 0.41)",
                    borderRadius: 5,
                    marginHorizontal: 10,
                    marginVertical: 5,
                    alignItems: "center",
                  }}
                  key={index}
                >
                  {/* brand image */}
                  <Image
                    style={{ width: wp("20%"), height: hp("6%") }}
                    source={item["image"]}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              )}
            />
          </View>

          {/* best seller view */}
          <View
            style={[
              categoryStyle,
              { marginTop: 15, backgroundColor: mowColors.categoryBGColor },
            ]}
          >
            {/* best seller title view */}
            <MowTitleView showButton={false} title={"Best Selling Products"} />

            {/* today's best discount list */}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={this.state.bestSellers}
              renderItem={({ item, index }) => (
                //best seller list item
                <View
                  style={{
                    width: wp("35%"),
                    height: hp("25%"),
                    marginHorizontal: 10,
                  }}
                  key={index}
                >
                  {/* image view */}
                  <View
                    style={{
                      height: "60%",
                      width: "100%",
                      borderRadius: 10,
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderColor: "rgba(112, 112, 112, 0.16)",
                      justifyContent: "center",
                    }}
                  >
                    {/* hearth icon touchable */}
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        zIndex: 99,
                      }}
                    >
                      <FAIcon
                        style={{
                          color: mowColors.titleTextColor,
                          fontSize: hp("2%"),
                        }}
                        name={"heart"}
                      />
                    </TouchableOpacity>

                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      resizeMode={"contain"}
                      source={item["image"]}
                    />

                    {!item["stock"] && (
                      // out of stock view
                      <View
                        style={{
                          position: "absolute",
                          opacity: 0.8,
                          backgroundColor: "#848484",
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: hp("1.8%"),
                            fontWeight: "normal",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: "#ffffff",
                          }}
                        >
                          {mowStrings.homeScreen.outOfStock}
                        </Text>
                      </View>
                    )}

                    {item["new"] && (
                      <View
                        style={{
                          position: "absolute",
                          backgroundColor: mowColors.mainColor,
                          top: 5,
                          left: 5,
                          borderRadius: 200,
                          width: hp("5%"),
                          height: hp("5%"),
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "#ffffff",
                          }}
                        >
                          {mowStrings.homeScreen.new}
                        </Text>
                      </View>
                    )}
                  </View>

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
                    }}
                  >
                    {item["name"]}
                  </Text>

                  {/* star view */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    {/* stars*/}
                    <MowStarView score={3} />

                    {/* vote count text */}
                    <Text
                      style={{
                        marginLeft: 2,
                        fontSize: hp("1.4%"),
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "left",
                        color: mowColors.textColor,
                      }}
                    >
                      {"("}
                      {10}
                      {")"}
                    </Text>
                  </View>

                  {/* price text */}
                  <Text
                    style={{
                      fontSize: hp("2%"),
                      fontWeight: "bold",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      textAlign: "left",
                      color: mowColors.titleTextColor,
                      marginTop: 5,
                    }}
                  >
                    {item["unitprice"]}
                  </Text>
                </View>
              )}
            />
          </View>

          {/* advantages view */}
          <View
            style={[
              categoryStyle,
              { marginTop: 15, backgroundColor: mowColors.categoryBGColor },
            ]}
          >
            {/* advantages title view */}
            <MowTitleView
              showButton={false}
              title={"Advantages of JomlaBazar"}
            />

            {/* advantages horizontal list */}
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              data={Advantages}
              renderItem={({ item, index }) => (
                // advantage item view
                <View
                  style={{
                    width: hp("12%"),
                    height: hp("11%"),
                    marginRight: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* advantage view */}
                  <View
                    style={{
                      borderRadius: 10,
                      backgroundColor: mowColors.mainColor,
                      width: "100%",
                      height: hp("8%"),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    {/* advantage image */}
                    <Image
                      style={{ width: hp("6%"), height: hp("6%") }}
                      source={item["image"]}
                      resizeMode={"contain"}
                    />
                  </View>

                  {/* advantage text */}
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: hp("1.4%"),
                      fontWeight: "normal",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      textAlign: "center",
                      color: mowColors.textColor,
                    }}
                  >
                    {item["title"]}
                  </Text>
                </View>
              )}
            />
          </View>

          {/* Deal of the week view */}
          <View
            style={[
              categoryStyle,
              {
                marginTop: 15,
                paddingRight: gPadding,
                backgroundColor: mowColors.categoryBGColor,
              },
            ]}
          >
            {/* smart phones title view */}
            <MowTitleView showButton={false} title={"Deal of the Week"} />

            {/* smart phones list */}
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              data={this.state.dealOfWeek}
              renderItem={({ item, index }) => (
                //smart phone list item
                <View
                  style={{
                    height: hp("33%"),
                    margin: 10,
                    marginTop: 0,
                    flex: 1,
                  }}
                  key={index}
                >
                  {/* image view */}
                  <View
                    style={{
                      height: "60%",
                      width: "100%",
                      borderRadius: 10,
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderColor: "rgba(112, 112, 112, 0.16)",
                      justifyContent: "center",
                    }}
                  >
                    {/* hearth icon touchable */}
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        zIndex: 99,
                      }}
                    >
                      <FAIcon
                        style={{
                          color: mowColors.titleTextColor,
                          fontSize: hp("2%"),
                        }}
                        name={"heart"}
                      />
                    </TouchableOpacity>

                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      resizeMode={"contain"}
                      source={item["image"]}
                    />

                    {item["new"] && (
                      <View
                        style={{
                          position: "absolute",
                          backgroundColor: mowColors.mainColor,
                          top: 5,
                          left: 5,
                          borderRadius: 200,
                          width: hp("5%"),
                          height: hp("5%"),
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "#ffffff",
                          }}
                        >
                          {mowStrings.homeScreen.new}
                        </Text>
                      </View>
                    )}
                  </View>

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
                    }}
                  >
                    {item["name"]}
                  </Text>

                  {/* star view */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    {/* stars*/}
                    <MowStarView score={3.5} />

                    {/* vote count text */}
                    <Text
                      style={{
                        marginLeft: 3,
                        fontSize: hp("1.4%"),
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "left",
                        color: mowColors.textColor,
                      }}
                    >
                      {"("}
                      {10}
                      {")"}
                    </Text>
                  </View>

                  {/* price & discount view */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 5,
                      alignItems: "center",
                    }}
                  >
                    {/* discount rate view */}
                    <View
                      style={{
                        backgroundColor: mowColors.mainColor,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        width: hp("5%"),
                        height: hp("5%"),
                      }}
                    >
                      <Text
                        style={{
                          fontSize: hp("2%"),
                          fontWeight: "bold",
                          fontStyle: "normal",
                          letterSpacing: 0,
                          textAlign: "left",
                          color: "#ffffff",
                        }}
                      >
                        {10}
                      </Text>
                    </View>

                    {/* price view */}
                    <View style={{ marginLeft: 10 }}>
                      {/* first price text view  */}
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* first price text */}
                        <Text
                          style={{
                            fontSize: hp("1.8%"),
                            fontWeight: "300",
                            fontStyle: "normal",
                            letterSpacing: 0,
                            textAlign: "center",
                            color: mowColors.textColor,
                          }}
                        >
                          {20}
                        </Text>

                        <View
                          style={{
                            backgroundColor: mowColors.mainColor,
                            width: "100%",
                            height: hp("0.1%"),
                            position: "absolute",
                          }}
                        />
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
                          color: mowColors.mainColor,
                        }}
                      >
                        {item["unitprice"]}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>

          {/* Featured Products view */}
          <View
            style={[
              categoryStyle,
              {
                marginTop: 15,
                paddingRight: gPadding,
                backgroundColor: mowColors.categoryBGColor,
              },
            ]}
          >
            {/* Featured Products title view */}
            <MowTitleView showButton={false} title={"Featured Products"} />

            {/* Featured Products list */}
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              data={this.state.featuredProducts}
              renderItem={({ item, index }) => (
                //car accessories list item
                <View
                  style={{
                    height: hp("33%"),
                    margin: 10,
                    marginTop: 0,
                    flex: 1,
                  }}
                  key={index}
                >
                  {/* image view */}
                  <View
                    style={{
                      height: "70%",
                      width: "100%",
                      borderRadius: 10,
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderColor: "rgba(112, 112, 112, 0.16)",
                      justifyContent: "center",
                    }}
                  >
                    {/* hearth icon touchable */}
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        zIndex: 99,
                      }}
                    >
                      <FAIcon
                        style={{
                          color: mowColors.titleTextColor,
                          fontSize: hp("2%"),
                        }}
                        name={"heart"}
                      />
                    </TouchableOpacity>

                    <Image
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                      resizeMode={"contain"}
                      source={item["image"]}
                    />

                    {item["new"] && (
                      <View
                        style={{
                          position: "absolute",
                          backgroundColor: mowColors.mainColor,
                          top: 5,
                          left: 5,
                          borderRadius: 200,
                          width: hp("5%"),
                          height: hp("5%"),
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "#ffffff",
                          }}
                        >
                          {mowStrings.homeScreen.new}
                        </Text>
                      </View>
                    )}
                  </View>

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
                    }}
                  >
                    {item["name"]}
                  </Text>

                  {/* star view */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    {/* stars*/}
                    <MowStarView score={4.5} />

                    {/* vote count text */}
                    <Text
                      style={{
                        marginLeft: 2,
                        fontSize: hp("1.4%"),
                        fontWeight: "normal",
                        fontStyle: "normal",
                        letterSpacing: 0,
                        textAlign: "left",
                        color: mowColors.textColor,
                      }}
                    >
                      {"("}
                      {12}
                      {")"}
                    </Text>
                  </View>

                  {/* price text */}
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: hp("2%"),
                      fontWeight: "bold",
                      fontStyle: "normal",
                      letterSpacing: 0,
                      textAlign: "left",
                      color: mowColors.titleTextColor,
                    }}
                  >
                    {item["unitprice"]}
                  </Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </MowContainer>
    );
  }
}
