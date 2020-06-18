import React from "react";
import {Text} from "react-native";
import Home from "./NotLogin/Home";
import {createDrawerNavigator, createStackNavigator} from "react-navigation";
import HomeScreen from "./Login/HomeScreen";
import MowSidebar from "../components/ui/Core/Sidebar/MowSidebar";
import {deviceWidth} from "../values/Constants/MowConstants";
import Settings from "./Login/Settings/Settings";
import Categories from "./Login/Categories/Categories";
import CategoryDetail from "./Login/Categories/CategoryDetail";
import ProductList from "./Login/Product/ProductList";
import SearchType from "./Login/Product/SearchType";
import Location from "./Login/Product/Location";
import ProductDetail from "./Login/Product/ProductDetail";
import Cart from "./Login/CartOperations/Cart";
import AddressList from "./Login/Address/AddressList";
import NewAddress from "./Login/Address/NewAddress";
import PaymentInformation from "./Login/CartOperations/PaymentInformation";
import CompleteOrder from "./Login/CartOperations/CompleteOrder";
import {User} from "../components/utils/User/User";
import NormalLogin from "./NotLogin/NormalLogin";
import Register from "./NotLogin/Register/Register";
import NormalRegister from "./NotLogin/Register/NormalRegister";
import Verification from "./NotLogin/Register/Verification";
import OrderList from "./Login/Orders/OrderList";
import Profile from "./Login/User/Profile";
import Password from "./Login/User/Password";
import WishList from "./Login/Favorites/Favorites";
import OrderDetail from "./Login/Orders/OrderDetail";
import CargoTracking from "./Login/Orders/CargoTracking";
import RateProduct from "./Login/Orders/RateProduct";
import ReturnRequest from "./Login/Orders/ReturnRequest";
import Feedback from "./Login/Feedback/Feedback";
import FAQ from "./Login/FAQ/FAQ";
import Filter from "./Login/Filter/Filter";
import HomeFilter from "./Login/Filter/HomeFilter";
import TrendCampaigns from "./Login/Campaign/TrendCampaigns";
import Notifications from "./Login/Notification/Notifications";
import AboutUs from "./Login/AboutUs/AboutUs";
import Privacy from "./Login/Privacy/Privacy";
import ContactUs from "./Login/ContactUs/ContactUs";
import ForgotPassword from "./NotLogin/Register/ForgotPassword/ForgotPassword";
import ExtraSecurity from "./NotLogin/Register/ForgotPassword/ExtraSecurity";
import ChangePassword from "./NotLogin/Register/ForgotPassword/ChangePassword";


let _self;

const StackOptions = {

    initialRoute: "Home",
    headerMode: "none",
    transparentCard: true,
    cardStyle: {
        backgroundColor: "transparent",
    },
    transitionConfig: () => ({
        containerStyle: {
            backgroundColor: "transparent",
        },
        transitionSpec: {
            duration: 0,
        },
    }),
    navigationOptions: ({navigation}) => ({
        drawerLockMode: 'locked-closed'
    })

};

// stack navigation
const StackNavigator = createStackNavigator({
    
        
        // Register: {screen: Register},
        Home: {screen: HomeScreen},
        HomeFilter: {screen: HomeFilter},
        // Home: {screen: Home},
        NormalLogin: {screen: NormalLogin},
        NormalRegister: {screen: NormalRegister},
        Verification: {screen: Verification},
        ForgotPassword: {screen: ForgotPassword},
        ExtraSecurity: {screen: ExtraSecurity},
        ChangePassword: {screen: ChangePassword},
        Categories: {screen: Categories},
        CategoryDetail: {screen: CategoryDetail},
        ProductList: {screen: ProductList},
        SearchType: {screen: SearchType},
        Location: {screen: Location},
        ProductDetail: {screen: ProductDetail},
        Cart: {screen: Cart},
        Feedback: {screen: Feedback},
        WishList: {screen: WishList},
        AboutUs: {screen: AboutUs},
        Privacy: {screen: Privacy},
        ContactUs: {screen: ContactUs},
        FAQ: {screen: FAQ}
    },
    StackOptions
);

// stack navigation
const AppContainer = createStackNavigator({
        Home: {screen: HomeScreen},
        HomeFilter: {screen: HomeFilter},
        TrendCampaigns: {screen: TrendCampaigns},
        Settings: {screen: Settings},
        Categories: {screen: Categories},
        CategoryDetail: {screen: CategoryDetail},
        ProductList: {screen: ProductList},
        SearchType: {screen: SearchType},
        ProductDetail: {screen: ProductDetail},
        Cart: {screen: Cart},
        CompleteOrder: {screen: CompleteOrder},
        Filter: {screen: Filter},
        Notifications: {screen: Notifications},
        PaymentInformation: {screen: PaymentInformation},
        AddressList: {screen: AddressList},
        NewAddress: {screen: NewAddress},
        OrderList: {screen: OrderList},
        OrderDetail: {screen: OrderDetail},
        CargoTracking: {screen: CargoTracking},
        RateProduct: {screen: RateProduct},
        ReturnRequest: {screen: ReturnRequest},
        Profile: {screen: Profile},
        Password: {screen: Password},
        WishList: {screen: WishList},
        Feedback: {screen: Feedback},
        AboutUs: {screen: AboutUs},
        Privacy: {screen: Privacy},
        ContactUs: {screen: ContactUs},
        FAQ: {screen: FAQ}

    },
    StackOptions
);

// drawer navigation
const DrawerNavigation = createDrawerNavigator(
    {
        HomeScreen: { screen: AppContainer }
    },
    {
        contentComponent: props => <MowSidebar {...props} />,
        drawerWidth: deviceWidth,
    }
);

const StackNavigation = createDrawerNavigator(
    {
        HomeScreen: { screen: StackNavigator }
    },
    {
        contentComponent: props => <MowSidebar {...props} />,
        drawerWidth: deviceWidth,
    }
);

let user = new User();

class Router extends React.Component {

    constructor(props)
    {
        super(props);

        _self = this;

        this.state = {
            login: false,
        };

        /**
         * changes all system regular component's fontFamily as 'Quicksand'
         * @type {(function(...[*]))|*}
         */
        let oldRender = Text.render;
        Text.render = function (...args) {
            let origin = oldRender.call(this, ...args);
            return React.cloneElement(origin, {
                style: [{fontFamily: 'Poppins'}, origin.props.style]
            });
        };
    }

    render() {

        // can control here is user login or not, then return related navigator

        if (user.isLogin() || this.state.login)
        {
            return (

                <DrawerNavigation/>
            )
        }
        else {
            return (

                <StackNavigation/>

            )
        }
    }
}

// to change user login situation from outside
export function setLogin(flag) {
    _self.setState({
        login: flag
    });
}

export default Router;
