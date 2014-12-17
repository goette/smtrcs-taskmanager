var React = require('react'),
    Router = require('react-router'),
    AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    PageConstants = require('../constants/PageConstants.js'),
    ModuleConstants = require('../constants/ModuleConstants.js'),
    NavigationConstants = require('../constants/NavigationConstants.js'),
    FilterConstants = require('../constants/FilterConstants.js'),
    PageFilterActionCreators = require('../actions/PageFilterActionCreators.js');

var ServerActionCreators = {
    receivePageConfig: function (moduleCollection, pageConfig) {
        AppDispatcher.handleServerAction({
            actionType: PageConstants.PAGE_RECEICVE_CONFIG,
            moduleCollection: moduleCollection,
            pageConfig: pageConfig
        });
        PageFilterActionCreators.update();
    },

    receiveNavigationConfig: function (navigationConfig) {
        AppDispatcher.handleServerAction({
            actionType: NavigationConstants.NAVIGATION_RECEICVE_CONFIG,
            navigationConfig: navigationConfig
        });
    },

    receiveModuleData: function (data, id) {
        AppDispatcher.handleServerAction({
            actionType: ModuleConstants.MODULE_RECEIVE_DATA,
            moduleData: data,
            moduleIdOnPage: id
        });
    },

    receiveFilterData: function (data, filterParam) {
        AppDispatcher.handleServerAction({
            actionType: FilterConstants.FILTER_RECEIVE_DATA,
            filterData: data,
            filterParam: filterParam
        });
    }
};

module.exports = ServerActionCreators;