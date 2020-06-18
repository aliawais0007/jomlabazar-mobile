
export const colorAlias = {
    DEFAULT: "default",
    BLUE: "blue",
    RED: "red",
    DARK: "dark"
};

export let mowColors = {

    mainColor: "#131921",

    mainColorLight: '#FF8800',
    
    mainColorDark: '#c36700',
    
    mainColorDarkest: '#9b4e00',
    
    navBarColor: "#Fab400",
    
    statusbarColor: "#ff8600",
    
    loadingIndicatorColor: "#ff8600",
    
    pageBGColor: "#fff",

    pageBGDarkColor: "#f0f0f0",

    viewBGColor: "#fff",
    
    titleTextColor: "#707070",
    
    textColor: "#aeaeae",
    
    lineColor: "#fff",
    
    loadingTextColor: '#fff',
    
    errorColor: '#911b1f',
    
    infoColor: '#2866BF',

    categoryBGColor: "#fff",
    
    noticeColor: '#737373',
    
    progressColor: '#2866BF',
    
    successColor: "#Fab400",
    
    warningColor: '#f29c00',
    
    shadowColor: "#707070",

    footer: "#fff",

    trendCampaign: {
        buttonBG: "#ff8600",
        buttonText: "#fff",
    },

    timerBG: "#fff",

    timerText: "#ff8600",

    titleIcon: "#ff8600",

    pagination: {
        activeDot: "#ff8600",
        passiveDot: "grey"
    },

    filterHeaderBG: "#ebebeb"
    
};

export function mowColorFunction(color) {

    // if there is no color value, set as default
    if (!color) {
        color = colorAlias.DEFAULT;
    }

    if (color === colorAlias.DEFAULT) {
        return mowColors;
    }
    else if (color === colorAlias.RED) {

        return mowColors = {

            navBarColor: '#f24343',

            statusbarColor: '#f24343',
    
            loadingIndicatorColor: '#f24343',
    
            pageBGColor: "#fff",

            pageBGDarkColor: "#e1e1e1",

            viewBGColor: "#fff",
    
            mainColor: "#f24343",
    
            mainColorLight: '#ff4646',
    
            mainColorDark: '#d44040',
    
            mainColorDarkest: '#ac3636',
    
            lineColor: "white",

            categoryBGColor: "#fff",
    
            loadingTextColor: '#fff',
    
            errorColor: '#911b1f',
    
            infoColor: '#2866BF',
    
            noticeColor: '#737373',
    
            progressColor: '#2866BF',
    
            successColor: "#f24343",
    
            warningColor: '#f29c00',
    
            shadowColor: "#000",
    
            titleTextColor: "#707070",
    
            textColor: "#aeaeae",

            footer: "#fff",

            trendCampaign: {
                buttonBG: "#f24343",
                buttonText: "#fff",
            },

            timerBG: "#fff",

            timerText: "#f24343",

            titleIcon: "#f24343",

            pagination: {
                activeDot: "#f24343",
                passiveDot: "grey"
            },

            filterHeaderBG: "#ebebeb"

        }
        
    }
    else if (color === colorAlias.BLUE) {
        
        return mowColors = {

            navBarColor: '#3580DF',

            statusbarColor: '#3580DF',
    
            loadingIndicatorColor: '#3580DF',
    
            pageBGColor: "#fff",

            pageBGDarkColor: "#e1e1e1",

            categoryBGColor: "#fff",

            viewBGColor: "#fff",
    
            mainColor: "#3580DF",
    
            mainColorLight: '#3a89f3',
    
            mainColorDark: '#3367c1',
    
            mainColorDarkest: '#2d54a2',
    
            lineColor: "#fff",
    
            loadingTextColor: '#fff',
    
            errorColor: '#911b1f',
    
            infoColor: '#2866BF',
    
            noticeColor: '#737373',
    
            progressColor: '#2866BF',
    
            successColor: "#3580DF",
    
            warningColor: '#f29c00',
    
            shadowColor: "#707070",
    
            titleTextColor: "#707070",
    
            textColor: "#aeaeae",

            footer: "#fff",

            trendCampaign: {
                buttonBG: "#3580DF",
                buttonText: "#fff",
            },

            timerBG: "#fff",

            timerText: "#3580DF",

            titleIcon: "#3580DF",

            pagination: {
                activeDot: "#3580DF",
                passiveDot: "grey"
            },

            filterHeaderBG: "#ebebeb"
            
        }
        
    }
    else if (color === colorAlias.DARK) {

        return mowColors = {

            mainColor: "#000",

            mainColorLight: '#000',

            mainColorDark: '#000',

            mainColorDarkest: '#000',

            navBarColor:"#000",

            statusbarColor: "#000",

            loadingIndicatorColor: "#fff",

            pageBGColor: "#000",

            pageBGDarkColor: "#000",

            categoryBGColor: "rgb(97, 97, 97)",

            viewBGColor: "rgb(97, 97, 97)",

            titleTextColor: "#fff",

            textColor: "#fff",

            lineColor: "#fff",

            loadingTextColor: '#fff',

            errorColor: '#911b1f',

            infoColor: '#2866BF',

            noticeColor: '#737373',

            progressColor: '#2866BF',

            successColor: "rgb(97, 97, 97)",

            warningColor: '#f29c00',

            shadowColor: "#707070",

            footer: "#707070",

            trendCampaign: {
                buttonBG: "#fff",
                buttonText: "#000",
            },

            timerBG: "#000",

            timerText: "#fff",

            titleIcon: "#fff",

            pagination: {
                activeDot: "#fff",
                passiveDot: "grey"
            },

            filterHeaderBG: "rgb(97, 97, 97)"
            
        }
        
    }
    
}

mowColorFunction();