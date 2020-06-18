import {Dimensions} from "react-native";

// to calculate item's width & height, that is to set the screen according to the item count
export function MowScreenCalculation() {

    let deviceWidth = Dimensions.get('window').width;

    let margin, itemCount;
    let ratio = 12 / 7;

    // margin value, that uses below, is total margin value that retrieved from (deviceWidth -(minus) total margin values)

    // to control deviceWidth to detect the better size and item count
    if (deviceWidth < 430)
    {
        margin = deviceWidth - 280;
        itemCount = 2;
    }
    else if (deviceWidth < 840)
    {
        margin = deviceWidth - 560;
        itemCount = 4;
    }
    else if (deviceWidth < 1200)
    {
        margin = deviceWidth - 700;
        itemCount = 5;
    }
    else {
        margin = deviceWidth - 840;
        itemCount = 6
    }

    let itemWidth = (deviceWidth - margin) / itemCount;
    let itemHeight = itemWidth * ratio;
    let itemMargin = (margin / (itemCount + 1)) / 2;

    // to return list item values
    return {
        itemWidth: parseInt(itemWidth),
        itemHeight: parseInt(itemHeight),
        itemMargin: itemMargin,
        itemCount: itemCount,
    };


}

