/*
 * ModuleStore
 */

var _ = require('lodash'),
    AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    PageStore = require('./PageStore.js'),
    PageFilterConstants = require('../constants/PageFilterConstants.js'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _filterParamsOnPage = [];

function buildFilterArray () {
    var arr = [];

    // Generate array of filterParams from modules on page,
    _.filter(PageStore.getModulesOnPage(), function (el) {
        if(el.filterParams) arr.push(el.filterParams);
    });

    // Flatten array and remove duplicates
    arr = _.uniq(_.flatten(arr));

    // Remove all blacklisted items
    _filterParamsOnPage = _.difference(arr, PageStore.getPageFilter().blacklist);
}

var PageFilterStore = assign({}, EventEmitter.prototype, {
    getFilterParamsOnPage: function () {
        return _filterParamsOnPage;
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
        case PageFilterConstants.RECEIVE_PAGE_MODULES:
            buildFilterArray(PageStore.getModulesOnPage());
            PageFilterStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PageFilterStore;