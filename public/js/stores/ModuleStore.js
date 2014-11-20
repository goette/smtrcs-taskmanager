/*
 * ModuleStore
 */

var _ = require('lodash'),
    AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ModuleConstants = require('../constants/ModuleConstants.js'),
    EventEmitter = require('events').EventEmitter,
    PageStore = require('./PageStore.js'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _moduleData = {};

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
        PageStore.dispatchToken
    ]);

    var action = payload.action;

    switch (action.actionType) {
        case ModuleConstants.MODULE_RECEIVE_DATA:
            _moduleData[action.pageId] = {
                data: JSON.parse(action.moduleData),
                moduleId: PageStore.getModuleByPageId(action.pageId).id
            }
            ModuleStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = ModuleStore;