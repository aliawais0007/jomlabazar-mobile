import React from "react";
import {FlatList, View} from "react-native";
import {mowStrings} from "../../../values/Strings/MowStrings";
import MowContainer from "../../../components/ui/Core/Container/MowContainer";
import Fashion from "../../../sampleData/Fashion";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import MowListItem from "../../../components/ui/Common/ListItem/MowListItem";
import {fontFamily, pageContainerStyle} from "../../../values/Styles/MowStyles";
import {mowColors} from "../../../values/Colors/MowColors";

export default class CategoryDetail extends React.Component {

    state = {
        selectedItemArr: [],
        listKey: 0
    };

    // to handle category selection
    _handleCategorySelection(index) {
        let selectedArr = this.state.selectedItemArr;

        let length = Fashion.length;

        for (let i = 0; i < length; i++) {
            if (i != index) {
                // to set false all array values except selected index
                selectedArr[i] = false;
            }
        }

        // to update selected item as its opposite
        selectedArr[index] = !selectedArr[index];

        this.setState({selectedItemArr: selectedArr, listKey: this.state.listKey + 1})
    }

    render() {

        return(

            <MowContainer
                title={mowStrings.categoryDetail.title}>

                {/* category list */}
                <FlatList
                    key={this.state.listKey} // to refresh list when selection is changed by user
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={Fashion}
                    style={[pageContainerStyle, {marginTop: 20}]}
                    renderItem={({ item, index }) => (

                        // category item view
                        <View
                            key={index}
                            style={{marginVertical: 7}}>

                            {/* category item */}
                            <MowListItem
                                border={true}
                                style={{height: hp("5%")}}
                                iconName={this.state.selectedItemArr[index] ? "minus" : "plus"}
                                onPress={() => {this._handleCategorySelection(index)}}
                                title={item["title"]}/>

                            {/* subcategory list */}
                            {
                                this.state.selectedItemArr[index] &&

                                    <FlatList
                                        key={this.state.listKey} // to refresh list when value change
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={(item, index) => index.toString()}
                                        data={item["subCategory"]}
                                        style={{marginTop: 10}}
                                        renderItem={({ item, index }) => (

                                            // sub category item view
                                            <View
                                                key={index}
                                                style={{width: "80%", marginLeft: "10%", marginRight: "5%", marginVertical: 10}}>

                                                {/* sub category item */}
                                               

                                            </View>

                                        )}/>
                            }


                        </View>

                    )}
                />

            </MowContainer>

        )

    }

}