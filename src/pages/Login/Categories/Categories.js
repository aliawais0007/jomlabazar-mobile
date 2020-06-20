import React from "react";
import {FlatList, View, Text, Image, TouchableOpacity} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import {mowColors} from "../../../values/Colors/MowColors";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
// import CategoriesData from "../../../sampleData/CategoriesData";
import MowListItem from "../../../components/ui/Common/ListItem/MowListItem";
import {pageContainerStyle, fontFamily} from "../../../values/Styles/MowStyles";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import SyncStorage from "sync-storage";
import { API_ROOT } from "../../../values/Constants/MowConstants";
import FAIcon from 'react-native-vector-icons/FontAwesome';

export default class Categories extends React.Component {

    state = {
        category: null,
        categories:[]
    };


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


    componentDidMount() {
        this.fetchCategories();
        this.props.navigation.addListener("willFocus", () => {
            // to get category value that selected from settings
            let category = SyncStorage.get("category");
            if (!category){
                // to set category value
                this.setState({category: 1});
            }
            else {
                // to set category value
                this.setState({categories: category});
            }
        })
    }

    render() {
        const {categories} = this.state;
        return(

            <MowContainer
                footerActiveIndex={2}
                title={mowStrings.categories.title}
                navbar={false}
                statusbar={false}
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

                        {"Categories"}

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


                {/* category list */}
                {
                    this.state.category === 1 &&

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            data={categories}
                            style={[pageContainerStyle]}
                            renderItem={({ item, index }) => (
                                // category item
                                <MowListItem
                                    key={index}
                                    style={{marginVertical: 5, borderRadius: 5}}
                                    onPress={() => {this.props.navigation.navigate("ProductList",{item:"Products"})}}
                                    imagePath={item["image"]}
                                    title={item['name']}/>

                            )}
                        />
                }

                {/* category list2 */}
                {/* {
                    this.state.category === 2 &&

                    <FlatList
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={CategoriesData}
                        style={[pageContainerStyle]}
                        renderItem={({ item, index }) => (

                            // category item
                            <TouchableOpacity
                                onPress={() => {this.props.navigation.navigate("CategoryDetail")}}
                                key={index}
                                style={{flex: 1, margin: 10, marginHorizontal: 15, alignItems: "center", justifyContent: "flex-end", borderRadius: 5}}>

                                <Image
                                    style={{width: "100%", height: hp(18), borderRadius: 5}}
                                    source={item["image"]}
                                    resizeMode={"stretch"}/>

                                <View
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        zIndex: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        opacity: 0.45,
                                        borderRadius: 5,
                                        backgroundColor: "#000000"
                                    }}/>

                                <Text
                                    style={{
                                        position: "absolute",
                                        color: "white",
                                        fontSize: hp(2),
                                        textAlign: "center",
                                        zIndex: 2,
                                        fontWeight: "bold",
                                        fontStyle: "normal",
                                        lineHeight: 27,
                                        letterSpacing: 0,
                                        bottom: 10
                                    }}>

                                    {item["title"]}

                                </Text>

                            </TouchableOpacity>

                        )}
                    />
                } */}

            </MowContainer>

        )

    }

}