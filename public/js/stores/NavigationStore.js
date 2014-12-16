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
    _navigation = [
        {
            children: [],
            id: 1,
            name: 'Home',
            parentId: 0,
            path: '/page/home'
        },
        {
            children: [],
            id: 2,
            name: 'Rankings',
            parentId: 0,
            path: '/page/rankings'
        },
        {
            children: [],
            id: 3,
            name: 'Links',
            parentId: 0,
            path: '/page/links'
        },
        {
            children: [],
            id: 6,
            name: 'Test',
            parentId: 2,
            path: '/page/test'
        },
        {
            children: [],
            id: 7,
            name: 'Test2',
            parentId: 4,
            path: '/page/test2'
        },
        {
            children: [],
            id: 4,
            name: 'Optimization',
            parentId: 0,
            path: '/page/optimization'
        },
        {
            children: [],
            id: 5,
            name: 'Traffic',
            parentId: 1,
            path: '/page/traffic'
        }
    ];

function _toggleMenuIsOpen (force) {
    if (force) {
        _menuIsOpen = false;
    } else {
        _menuIsOpen = !_menuIsOpen;
    }
}

var NavigationStore = assign({}, EventEmitter.prototype, {
    getMenuIsOpen: function () {
        return _menuIsOpen;
    },

    getNavigation: function () {
        console.log(_navigation.sort(function (a, b) {return a.parentId - b.parentId}));
        return _navigation.sort(function (a, b) {return a.parentId - b.parentId});
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
        case NavigationConstants.NAVIGATION_RECEIVE_CONFIG:
            console.log('Navigation data received')
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