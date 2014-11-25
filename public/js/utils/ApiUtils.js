var ServerActionCreators = require('../actions/ServerActionCreators.js');

function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

module.exports = {
    getPageConfig: function() {
        // simulate retrieving data from server
        var pageConfig = JSON.parse(localStorage.getItem('pageConfig')),
            moduleCollection = JSON.parse(localStorage.getItem('moduleCollection'));

        // simulate success callback after 200ms
        setTimeout(function () {
            ServerActionCreators.receivePageConfig(moduleCollection, pageConfig);
        }, 500);
    },

    getModuleData: function (url, id) {
        get(url).then(function (response) {
            ServerActionCreators.receiveModuleData(response, id);
        }, function (error) {
            console.error("Failed!", error);
        });
    },

    getFilterData: function (url, filterParam) {
        get(url).then(function (response) {
            setTimeout(function () {
                ServerActionCreators.receiveFilterData(response, filterParam);
            }, 200);
        }, function (error) {
            console.error("Failed!", error);
        });
    }
};