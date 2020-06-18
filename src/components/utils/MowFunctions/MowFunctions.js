class MowFunctions {

    // to search an item from an array with desired key value, then return the result as an array
    mowSearch(fullData, searchKey, searchValue){
        let searchedData = [];
        fullData.find((el) => {
            if (el[searchKey].toLocaleLowerCase().search(searchValue.toLocaleLowerCase()) !== -1) {
                searchedData.push(el);
            }
        });
        return searchedData;
    }

    mowInArray(dataArr, searchKey, searchValue){
        let flag = false;
        dataArr.find((obj) => {
            if (obj[searchKey].valueOf() == searchValue) {
                flag = true;
            }
        });

        return flag;
    }

}

export const _MF = new MowFunctions();
