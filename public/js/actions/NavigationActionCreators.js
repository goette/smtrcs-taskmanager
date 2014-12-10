var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    NavigationConstants = require('../constants/NavigationConstants.js');

var NavigationActionCreators = {
    receiveConfig: function ( navigationConfig) {
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
    routeChange: function (l) {
        console.log(l);
    }
};

module.exports = NavigationActionCreators;