var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    NavigationConstants = require('../constants/NavigationConstants.js');

var NavigationActionCreators = {
    receiveNavigationConfig: function (navigationConfig) {
        AppDispatcher.handleViewAction({
            actionType: NavigationConstants.NAVIGATION_RECEIVE_CONFIG,
            navigationConfig: navigationConfig
        });
    },
    toggle: function (force) {
        AppDispatcher.handleViewAction({
            actionType: NavigationConstants.NAVIGATION_TOGGLE,
            force: force
        });
    },
    setParentId: function (parentId) {
        AppDispatcher.handleViewAction({
            actionType: NavigationConstants.NAVIGATION_SET_PARENTID,
            parentId: parentId
        });
    },
    setInitialPath: function (path) {
        AppDispatcher.handleViewAction({
            actionType: NavigationConstants.NAVIGATION_SET_INITIAL_PATH,
            path: path
        });
    },
    routeChange: function (l) {
        console.log(l);
    }
};

module.exports = NavigationActionCreators;