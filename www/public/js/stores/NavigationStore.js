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
            name: 'Traffic',
            parentId: 1,
            path: '/page/traffic'
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
        var root = {id:0, parentId: null, children: []},
            node_list = { 0 : root};

        // Sort _navigation by parentId
        _.sortBy(_navigation, function(item) {
            return [item.parentId.a, item.parentId.b];
        });

        for (var i = 0; i < _navigation.length; i++) {
            node_list[_navigation[i].id] = _navigation[i];
            node_list[_navigation[i].parentId].children.push(node_list[_navigation[i].id]);
        }

        return root.children;
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