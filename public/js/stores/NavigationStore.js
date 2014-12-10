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
    _menuConfig = [
        {

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