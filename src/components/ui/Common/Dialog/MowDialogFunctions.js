/**
 *
 * @param medium                     --> dialog medium
 * @param message                   --> dialog message
 * @param bpt                       --> dialog Button Positive Text
 * @param bnt                       --> dialog Button Negative Text
 * @param twoButton                 --> dialog button number(boolean)
 * @param dialogType                --> dialog type
 * @returns {Promise<unknown>}
 */

/**
 * to generate dialog content here
 */


export function _myDialog(title, message, bpt = "OK", bnt = "Cancel", twoButton = false, dialogType = "default") {

    return new Promise(function (resolve, reject) {

        __dialogThis.setState({
            twoButton: twoButton,
            title: title,
            message: message,
            bpt: bpt,
            bnt: bnt,
            dialogType: dialogType,
            showDialog: true,
            buttonPositive: function () {
                resolve();
            },
            buttonNegative: function () {
                reject();
            }
        })

    });
}

export function _successDialog(title, message, bpt = "OK", bnt = "Cancel", twoButton = false) {

    return new Promise(function (resolve, reject) {

        __dialogThis.setState({
            twoButton: twoButton,
            title: title,
            message: message,
            bpt: bpt,
            bnt: bnt,
            dialogType: "success",
            showDialog: true,
            buttonPositive: function () {
                resolve();
            },
            buttonNegative: function () {
                reject();
            }
        })

    });
}

export function _warningDialog(title, message, bpt = "OK", bnt = "Cancel", twoButton = false) {

    return new Promise(function (resolve, reject) {

        __dialogThis.setState({
            twoButton: twoButton,
            title: title,
            message: message,
            bpt: bpt,
            bnt: bnt,
            dialogType: "warning",
            showDialog: true,
            buttonPositive: function () {
                resolve();
            },
            buttonNegative: function () {
                reject();
            }
        })

    });

}

export function _errorDialog(title, message, bpt = "OK", bnt = "Cancel", twoButton = false) {

    return new Promise(function (resolve, reject) {

        __dialogThis.setState({
            twoButton: twoButton,
            title: title,
            message: message,
            bpt: bpt,
            bnt: bnt,
            dialogType: "error",
            showDialog: true,
            buttonPositive: function () {
                resolve();
            },
            buttonNegative: function () {
                reject();
            }
        })

    });

}

export function _defaultDialog(title, message, bpt = "OK", bnt = "Cancel", twoButton = false) {

    return new Promise(function (resolve, reject) {

        __dialogThis.setState({
            twoButton: twoButton,
            title: title,
            message: message,
            bpt: bpt,
            bnt: bnt,
            dialogType: "default",
            showDialog: true,
            buttonPositive: function () {
                resolve();
            },
            buttonNegative: function () {
                reject();
            }
        })

    });

}