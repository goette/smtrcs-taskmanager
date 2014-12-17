    /*
 * ModuleStore
 */

var _ = require('lodash');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ModuleConstants = require('../constants/ModuleConstants.js');
var EventEmitter = require('events').EventEmitter;
var PageStore = require('./PageStore.js');
var PageFilterStore = require('./PageFilterStore.js');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
var _moduleData = {};

var ModuleStore = assign({}, EventEmitter.prototype, {
    getModuleData: function () {
        return _moduleData;
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
ModuleStore.dispatchToken = AppDispatcher.register(function (payload) {
    AppDispatcher.waitFor([
        PageStore.dispatchToken,
        PageFilterStore.dispatchToken
    ]);

    var action = payload.action;

    switch (action.actionType) {
        case ModuleConstants.MODULE_RECEIVE_DATA:
            var module = PageStore.getModuleByIdOnPage(action.moduleIdOnPage),
                moduleId =  module && module.id;
            _moduleData[action.moduleIdOnPage] = {
                data: JSON.parse(action.moduleData),
                moduleId: moduleId || ''
            }
            ModuleStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = ModuleStore;