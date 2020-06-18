/**
 *
 * app string object here
 *
 * easy to use & suitable for multiple languages
 */

import LocalizedString from "react-native-localization";

export const mowStrings = new LocalizedString({

    en: {
        __language: "Language",
        _forward: "Forward",
        welcome: "Welcome",
        amount: "Amount",
        description: "Description",
        date: "Date",
        search: "Search categories or product",
        home: 'Home',
        messages: "Messages",
        notification: "Notifications",
        profile: "Profile",
        exit: "Exit",
        explore: "Explore",
        _categories: "Categories",
        cart: "My Cart",
        orders: "Orders",
        policyAndTerms: "Policy and Terms",
        pleaseWait: 'Please Wait...',
        register: 'Register',
        login: "LOGIN",
        signUp: "Sign Up",
        hello: 'Hello!',
        remove: "Remove",
        viewMore: "View More",
        or: "or",
        star: "Star",
        off: "Off",
        on: "On",
        theme: "Theme",
        productAdded: "Product added.",
        alertDialogs: {
            success: "Successful!",
            warning: "Warning!",
            error: "Error!",
            language: "Language",
            connectionError: 'Please try again, when you have an internet connection.',
            logout: 'Are you sure you want to quit?',
            matchError: "Password fields are not matching. Please check again.",
            languageMessage: 'Current language will change. Are you sure?',
            addressSelection: "Please retry after address selection.",
            removeFavorite: "Are you sure want to remove product from favorite list?",
            cannotBeNull: {

            }
        },
        homeScreen: {
            trendCampaign: "Trend Campaigns",
            trendCategories: "Trend Categories",
            bestDiscounts: "Today's Best Discounts",
            bestSeller: "Best Seller",
            outOfStock: "Out of Stock",
            advantages: "Advantages of Mowega",
            smartPhones: "Smart Phones",
            carAccessories: "Car Accessories",
            new: "New",
            trendBrands: "Trend Brands",
            browseAmazingProduct: "Browse Stylish and Amazing Products"
        },
        drawerMenu: {
            faq: "FAQ.",
            settings: "Settings",
            exit: "Exit",
            logout: "Logout",
            profile: "Profile",
            password: "Password",
            favorites: "My Favorites",
            notification: "Notifications",
            cart: "My Cart",
            giftCheck: "Check Gifts",
            feedback: "Application Feedback",
            customerService: "Customer Service",
            privacy: "Privacy",
            aboutUs: "About Us",
            contactUs: "Contact Us"
        },
        button: {
            delete: "DELETE",
            edit: "EDIT",
            add: "ADD",
            remove: "REMOVE",
            update: "UPDATE",
            cancel: "CANCEL",
            ok: "OK",
            back: "Back",
            forward: "Forward",
            send: "SEND",
            yes: "YES",
            no: "NO",
            save: "SAVE",
            close: "CLOSE",
            approve: "APPROVE",
            apply: "APPLY",
            continue: "CONTINUE",
            sendAgain: "Send Again",
            shoppingNow: "Shopping Now",
            addToCart: "ADD TO CART",
            completeShopping: "COMPLETE SHOPPING",
            completePayment: "COMPLETE PAYMENT",
            goToPayment: "GO TO PAYMENT",
            addNewAddress: "ADD NEW ADDRESS",
            saveAddress: "SAVE ADDRESS",
            createAnAccount: "Create an Account",
            updatePassword: "UPDATE PASSWORD",
            createReturnRequest: "CREATE RETURN REQUEST",
            submit: "SUBMIT",
        },
        placeholder: {
            name: "Name",
            surname: "Surname",
            phone: "Phone",
            country: "Country",
            city: "City",
            town: "Town",
            fullAddress: "Please enter your full address information",
            addressName: "Address Name (Home, Office, etc.)",
            cardOwnerName: "Card Owner Name",
            cardNumber: "Card Number",
            expiryDate: "MM/YY",
            cvc: "Security Code",
            fullName: "Name & Surname",
            username: "Username",
            email: "E-Mail",
            birthday: "Birthday",
            gender: "Gender",
            language: "Language",
            currentPassword: "Current Password",
            newPassword: "New Password",
            newPassword2: "Confirm Password",
            couponCode: "Coupon Code",
            feedbackTitle: "Feedback Title",
            feedbackComment: "Feedback Message Here",
            password: "Password",
            passwordRepeat: "Password Repeat",
        },
        infoHeader: {
            deliverInformation: "Delivery\nInformation",
            paymentInformation: "Payment\nInformation",
            completingOrder: "Completing\nOrder"
        },
        profilePage: {
            title: "My Profile"
        },
        faq: {
            title: "FAQ.",
        },
        categories: {
            title: "Categories"
        },
        categoryDetail: {
            title: "Category Detail"
        },
        products: {
            title: "Products",
            filter: "Filter",
            orderBy: "Order By"
        },
        productDetail: {
            title: "Product Detail",
            freeShippingInfo: "Free shipping for $50 and over.",
            bodySize: "Body Size",
            color: "Color",
            like: "Like",
            report: "Report",
            share: "Share",
            customerComments: "Customer Comments",
            productFeature: "Product Feature",
            showMore: "Show More"
        },
        addressList: {
            title: "My Addresses",
            deliveryInformation: "Delivery Information"
        },
        paymentInformation: {
            title: "Payment",
            creditCard: "Credit Card"
        },
        completeOrder: {
            title: "Payment",
            congratulations: "Congratulations!",
            completeMessage: "Payment Completed\nSuccessfully",
            orderNumber: "Your Order Number",
            orderMessage: "You can follow your orders from the Orders Page"
        },
        settings: {
            title: "Settings",
            darkTheme: "Dark Theme",
        },
        feedback: {
            title: "Feedback",
        },
        loginHome: {
            withEmail: "Sign in with Email",
            withFacebook: "Sign in with Facebook",
            withGoogle: "Sign in with Google",
            newHere: "Are you new here?",
            createAnAccount: "Create an account",
            usageTerms: "Usage Terms"
        },
        signUpPage: {
            withEmail: "Sign up with Email",
            withFacebook: "Sign up with Facebook",
            withGoogle: "Sign up with Google",
            haveAccount: "Do you have already an account?",
            usageTerms: "Usage Terms",
            username: "Username",
            password: "Password",
            name: "Name and Surname",
            almostDone: "Almost Done",
            securityCodeMessage: "To use the Mowega-Shop-App,\nwe've sent a verification code to\nbiancawatkins@gmail.com",
            verificationCodeMessage: "Enter the 5-digit security code, then approve.",
            codeError: "No verification code?",
            congratsMessage: "Congratulations,\nyour registration was completed successfully.\nNow you can start using the app."
        },
        orderList: {
            title: "My Orders",
            showAll: "Show All",
            canceledProducts: "Canceled",
            returnedProducts: "Returned"
        },
        orderDetail: {
            title: "Order Detail",
            cargoTracking: "Cargo Tracking",
            rateProduct: "Rate Product",
            cancelRequest: "Request for Cancellation",
            addressInfo: "Address Information",
            paymentInfo: "Payment Information",
            returnReason: "Order Return Reason",
            cancelReason: "Order Cancel Reason",
        },
        cargoTracking: {
            title: "Cargo Tracking",
            cargoMovements: "Cargo Movements"
        },
        rateProduct: {
            title: "Rate Product",
            reviewText: "Write a review for this product"
        },
        returnRequest: {
            title: "Return Request for Order",
            returnReason: "Return Reason",
            returnTextTitle: "Return Request Description"
        },
        loginPage: {
            username: "Username",
            password: "Password",
            forgotPassword: "Forgot Password",
            cantAccessAccount: "Can't access your account?"
        },
        passwordPage: {
            title: "Password",
        },
        favoritesPage: {
            title: "My Favorites",
        },
        picker: {
            sort: {
                smartSorting: "Smart Sorting",
                bestSeller: "Best Sellers",
                newest: "The Newests",
                lowestPrice: "Lowest Price",
                highestPrice: "Highest Price",
                topRated: "Top Rated",
                highestScore: "Highest Score",
                lowestScore: "Lowest Score"
            }
        },
        filter: {
            title: "Filter",
            category: "Category",
            brand: "Brand",
            priceRange: "Price Range",
            color: "Color",
            bodySize: "Body Size",
            ratingScore: "Rating Score",
            startPrice: "Start Price",
            endPrice: "End Price",
            popularSearch: "Popular Search",
            searchHistory: "Search History",
            clear: "Clear"
        },
        notifications: {
            title: "Notifications",
            markAll: "Mark as All Read"
        },
        cartScreen: {
            subtotal: "Subtotal",
            coupon: "Coupon",
            shipping: "Shipping"
        },
        forgotPasswordScreen: {
            title: "Forgot Password",
            instruction: "Enter your email address for retrieving instructions that explain how to reset password.",
        },
        extraSecurity: {
            title: "Extra Security",
            infoMessage: "To continue, you must enter the verification code that sent to your mobile phone.",
            timeRemaining: "Time Remaining",
            noVerificationCode: "No verification code?"
        },
        changePasswordScreen: {
            title: "Change Password",
            infoMessage: "To change password, enter new password then press the 'Update Password' button."
        }
    },

    /**
     *  only changed home screen for sample
     */
    de: {
        __language: "Language",
        _forward: "Forward",
        welcome: "Welcome",
        amount: "Amount",
        description: "Description",
        date: "Date",
        search: "Search categories or product",
        home: 'Home',
        messages: "Messages",
        notification: "Notifications",
        profile: "Profile",
        exit: "Exit",
        explore: "Explore",
        _categories: "Categories",
        cart: "My Cart",
        orders: "Orders",
        policyAndTerms: "Policy and Terms",
        pleaseWait: 'Please Wait...',
        register: 'Register',
        login: "LOGIN",
        signUp: "Sign Up",
        hello: 'Hello!',
        remove: "Remove",
        viewMore: "View More",
        or: "or",
        star: "Star",
        off: "Off",
        on: "On",
        theme: "Theme",
        productAdded: "Product added.",
        alertDialogs: {
            success: "Successful!",
            warning: "Warning!",
            error: "Error!",
            language: "Language",
            connectionError: 'Please try again, when you have an internet connection.',
            logout: 'Are you sure you want to quit?',
            matchError: "Password fields are not matching. Please check again.",
            languageMessage: 'Current language will change. Are you sure?',
            addressSelection: "Please retry after address selection.",
            removeFavorite: "Are you sure want to remove product from favorite list?",
            cannotBeNull: {

            }
        },
        homeScreen: {
            trendCampaign: "Trendkampagnen",
            trendCategories: "Trendkategorien",
            bestDiscounts: "Die besten Rabatte von heute",
            bestSeller: "Bestseller",
            outOfStock: "Nicht vorrättig",
            advantages: "Vorteile von Mowega",
            smartPhones: "Smartphones",
            carAccessories: "Auto Zubehör",
            new: "Neu",
            trendBrands: "Trendmarken",
            browseAmazingProduct: "Produkte durchsuchen"
        },
        drawerMenu: {
            faq: "FAQ.",
            settings: "Settings",
            exit: "Exit",
            logout: "Logout",
            profile: "Profile",
            password: "Password",
            favorites: "My Favorites",
            notification: "Notifications",
            cart: "My Cart",
            giftCheck: "Check Gifts",
            feedback: "Application Feedback",
            customerService: "Customer Service",
            privacy: "Privacy",
            aboutUs: "About Us",
            contactUs: "Contact Us"
        },
        button: {
            delete: "DELETE",
            edit: "EDIT",
            add: "ADD",
            remove: "REMOVE",
            update: "UPDATE",
            cancel: "CANCEL",
            ok: "OK",
            back: "Back",
            forward: "Forward",
            send: "SEND",
            yes: "YES",
            no: "NO",
            save: "SAVE",
            close: "CLOSE",
            approve: "APPROVE",
            apply: "APPLY",
            continue: "CONTINUE",
            sendAgain: "Send Again",
            shoppingNow: "Shopping Now",
            addToCart: "ADD TO CART",
            completeShopping: "COMPLETE SHOPPING",
            completePayment: "COMPLETE PAYMENT",
            goToPayment: "GO TO PAYMENT",
            addNewAddress: "ADD NEW ADDRESS",
            saveAddress: "SAVE ADDRESS",
            createAnAccount: "Create an Account",
            updatePassword: "UPDATE PASSWORD",
            createReturnRequest: "CREATE RETURN REQUEST",
            submit: "SUBMIT",
        },
        placeholder: {
            name: "Name",
            surname: "Surname",
            phone: "Phone",
            country: "Country",
            city: "City",
            town: "Town",
            fullAddress: "Please enter your full address information",
            addressName: "Address Name (Home, Office, etc.)",
            cardOwnerName: "Card Owner Name",
            cardNumber: "Card Number",
            expiryDate: "MM/YY",
            cvc: "Security Code",
            fullName: "Name & Surname",
            username: "Username",
            email: "E-Mail",
            birthday: "Birthday",
            gender: "Gender",
            language: "Language",
            currentPassword: "Current Password",
            newPassword: "New Password",
            newPassword2: "Confirm Password",
            couponCode: "Coupon Code",
            feedbackTitle: "Feedback Title",
            feedbackComment: "Feedback Message Here",
            password: "Password",
            passwordRepeat: "Password Repeat",
        },
        infoHeader: {
            deliverInformation: "Delivery\nInformation",
            paymentInformation: "Payment\nInformation",
            completingOrder: "Completing\nOrder"
        },
        profilePage: {
            title: "My Profile"
        },
        faq: {
            title: "FAQ.",
        },
        categories: {
            title: "Categories"
        },
        categoryDetail: {
            title: "Category Detail"
        },
        products: {
            title: "Products",
            filter: "Filter",
            orderBy: "Order By"
        },
        productDetail: {
            title: "Product Detail",
            freeShippingInfo: "Free shipping for $50 and over.",
            bodySize: "Body Size",
            color: "Color",
            like: "Like",
            report: "Report",
            share: "Share",
            customerComments: "Customer Comments",
            productFeature: "Product Feature",
            showMore: "Show More"
        },
        addressList: {
            title: "My Addresses",
            deliveryInformation: "Delivery Information"
        },
        paymentInformation: {
            title: "Payment",
            creditCard: "Credit Card"
        },
        completeOrder: {
            title: "Payment",
            congratulations: "Congratulations!",
            completeMessage: "Payment Completed\nSuccessfully",
            orderNumber: "Your Order Number",
            orderMessage: "You can follow your orders from the Orders Page"
        },
        settings: {
            title: "Settings",
            darkTheme: "Dark Theme",
        },
        feedback: {
            title: "Feedback",
        },
        loginHome: {
            withEmail: "Sign in with Email",
            withFacebook: "Sign in with Facebook",
            withGoogle: "Sign in with Google",
            newHere: "Are you new here?",
            createAnAccount: "Create an account",
            usageTerms: "Usage Terms"
        },
        signUpPage: {
            withEmail: "Sign up with Email",
            withFacebook: "Sign up with Facebook",
            withGoogle: "Sign up with Google",
            haveAccount: "Do you have already an account?",
            usageTerms: "Usage Terms",
            username: "Username",
            password: "Password",
            name: "Name and Surname",
            almostDone: "Almost Done",
            securityCodeMessage: "To use the Mowega-Shop-App,\nwe've sent a verification code to\nbiancawatkins@gmail.com",
            verificationCodeMessage: "Enter the 5-digit security code, then approve.",
            codeError: "No verification code?",
            congratsMessage: "Congratulations,\nyour registration was completed successfully.\nNow you can start using the app."
        },
        orderList: {
            title: "My Orders",
            showAll: "Show All",
            canceledProducts: "Canceled",
            returnedProducts: "Returned"
        },
        orderDetail: {
            title: "Order Detail",
            cargoTracking: "Cargo Tracking",
            rateProduct: "Rate Product",
            cancelRequest: "Request for Cancellation",
            addressInfo: "Address Information",
            paymentInfo: "Payment Information",
            returnReason: "Order Return Reason",
            cancelReason: "Order Cancel Reason",
        },
        cargoTracking: {
            title: "Cargo Tracking",
            cargoMovements: "Cargo Movements"
        },
        rateProduct: {
            title: "Rate Product",
            reviewText: "Write a review for this product"
        },
        returnRequest: {
            title: "Return Request for Order",
            returnReason: "Return Reason",
            returnTextTitle: "Return Request Description"
        },
        loginPage: {
            username: "Username",
            password: "Password",
            forgotPassword: "Forgot Password",
            cantAccessAccount: "Can't access your account?"
        },
        passwordPage: {
            title: "Password",
        },
        favoritesPage: {
            title: "My Favorites",
        },
        picker: {
            sort: {
                smartSorting: "Smart Sorting",
                bestSeller: "Best Sellers",
                newest: "The Newests",
                lowestPrice: "Lowest Price",
                highestPrice: "Highest Price",
                topRated: "Top Rated",
                highestScore: "Highest Score",
                lowestScore: "Lowest Score"
            }
        },
        filter: {
            title: "Filter",
            category: "Category",
            brand: "Brand",
            priceRange: "Price Range",
            color: "Color",
            bodySize: "Body Size",
            ratingScore: "Rating Score",
            startPrice: "Start Price",
            endPrice: "End Price",
            popularSearch: "Popular Search",
            searchHistory: "Search History",
            clear: "Clear"
        },
        notifications: {
            title: "Notifications",
            markAll: "Mark as All Read"
        },
        cartScreen: {
            subtotal: "Subtotal",
            coupon: "Coupon",
            shipping: "Shipping"
        },
        forgotPasswordScreen: {
            title: "Forgot Password",
            instruction: "Enter your email address for retrieving instructions that explain how to reset password.",
        },
        extraSecurity: {
            title: "Extra Security",
            infoMessage: "To continue, you must enter the verification code that sent to your mobile phone.",
            timeRemaining: "Time Remaining",
            noVerificationCode: "No verification code?"
        },
        changePasswordScreen: {
            title: "Change Password",
            infoMessage: "To change password, enter new password then press the 'Update Password' button."
        }
    },

});
