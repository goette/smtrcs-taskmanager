/*
 * ModuleStore
 */

var _ = require('lodash'),
    AppDispatcher = require('../_dispatcher/app.dispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    PageConstants = require('../constants/page.constants.js'),
    merge = require('react/lib/merge'),
    CHANGE_EVENT = 'change',
    _moduleCollection = require('../_config/moduleCollection'),
    _onThisPage = require('../_config/static_page'); // This will become an ajax call

var PageStore = merge(EventEmitter.prototype, {
    /**
     * Get the entire collection of views.
     * @return {object}
     */
    getModulesOnPage: function () {
        return _onThisPage;
    },

    getModuleCollection: function () {
        return _moduleCollection;
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
AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case PageConstants.MODULE_ADD:
            addModuleToPage();
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_REMOVE:
            removeModuleFromPage(action.moduleId);
            PageStore.emitChange();
            break;

        default:
            return true;
    }

    // This often goes in each case that should trigger a UI change. This store
    // needs to trigger a UI change after every view action, so we can make the
    // code less repetitive by putting it here.  We need the default case,
    // however, to make sure this only gets called after one of the cases above.


    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PageStore;