/*
 * ModuleStore
 */

var _ = require('lodash'),
    AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    NavigationConstants = require('../constants/NavigationConstants.js'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _menuIsOpen = false,
    _mappedNavigation = [];

function _toggleMenuIsOpen (force) {
    if (force) {
        _menuIsOpen = false;
    } else {
        _menuIsOpen = !_menuIsOpen;
    }
}

// parent and tree are needed by recursion
function _unflattenNavigationElements (array, parent, tree) {
    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : {id: 0};

    var children = _.filter(array, function (child) {
        return child.parentId === parent.id;
    });

    if(!_.isEmpty(children)){
        if (parent.id === 0) {
            tree = children;
        } else {
            parent['children'] = children
        }
        _.each(children, function (child) {
            _unflattenNavigationElements(array, child)
        });
    }

    _mappedNavigation = tree;
}

var NavigationStore = assign({}, EventEmitter.prototype, {
    getMenuIsOpen: function () {
        return _menuIsOpen;
    },

    getNavigation: function () {
        console.log(_mappedNavigation);
        return _mappedNavigation;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register to handle all updates
NavigationStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case NavigationConstants.NAVIGATION_RECEICVE_CONFIG:
            _unflattenNavigationElements(action.navigationConfig); // this would be the nav response obj
            NavigationStore.emitChange();
            break;

        case NavigationConstants.NAVIGATION_TOGGLE:
            _toggleMenuIsOpen(action.force);
            NavigationStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = NavigationStore;