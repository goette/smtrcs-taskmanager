/*
 * ModuleStore
 */

var _ = require('lodash'),
    AppDispatcher = require('../_dispatcher/app.dispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    PageStore = require('./page.store'),
    PageFilterConstants = require('../constants/page_filter.constants.js'),
    merge = require('react/lib/merge'),
    CHANGE_EVENT = 'change',
    _filterParamsOnPage = [];

var PageFilterStore = merge(EventEmitter.prototype, {
    getFilterParamsOnPage: function () {
        return _.uniq(_.flatten(_.map(PageStore.getModulesOnPage(), 'filterParams')));
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
PageFilterStore.dispatchToken = AppDispatcher.register(function (payload) {
    AppDispatcher.waitFor([
        PageStore.dispatchToken
    ]);

    var action = payload.action;

    switch (action.actionType) {
        case PageFilterConstants.PAGE_FILTER_INITIALIZE:
            PageFilterStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PageFilterStore;