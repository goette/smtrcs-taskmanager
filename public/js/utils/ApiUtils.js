var $ = require('jquery'),
    config = require('../config'),
    ServerActionCreators = require('../actions/ServerActionCreators.js'),
    PageStore = require('../stores/PageStore'),
    savePageConfigAction = config.PATH_ROOT + 'branches/suite7/controller_php/services/page/save.php',
    retrievePageConfigAction = config.PATH_ROOT + 'branches/suite7/controller_php/services/page/retrieve.php';

function get(url, data) {
    return $.ajax({
        type: 'GET',
        url: url
    });
}

function post(url, data) {
    return $.ajax({
        type: 'POST',
        url: url,
        data: data
    });
}

module.exports = {
    savePageConfig: function () {
        var configToWrite = PageStore.getCurrentPageConfig();
        // Action to show loader
        post(savePageConfigAction, {
            name: configToWrite['url'].replace('/',''),
            config: configToWrite
        }).then(function (response) {
            // Action to hide loader
        }, function (error) {
            console.error('Saving failed!', error);
        });
    },

    retrievePageConfig: function (pageName) {
        var pageConfig,
            moduleCollection;

        post(retrievePageConfigAction, {
            name: pageName
        }).then(function (response) {
            pageConfig = JSON.parse(response);
            moduleCollection = JSON.parse(localStorage.getItem('moduleCollection'));
            ServerActionCreators.receivePageConfig(moduleCollection, pageConfig);
        }, function (error) {
            console.error('Retrieveing failed!', error);
        });
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