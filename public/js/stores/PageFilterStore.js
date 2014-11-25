/*
 * ModuleStore
 */

var _ = require('lodash'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    PageStore = require('./PageStore'),
    FilterConfig = require('../filter/_FilterConfig'),
    FilterActionCreators = require('../actions/FilterActionCreators'),
    PageFilterConstants = require('../constants/PageFilterConstants'),
    FilterConstants = require('../constants/FilterConstants'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _filterParamsOnPage = [],
    _filterDataOnPage = {};

function _buildFilterArray () {
    var arr = [];

    // Generate array of filterParams from modules on page,
    _.filter(PageStore.getModulesOnPage(), function (el) {
        if(el.filterParams) {
            arr.push(el.filterParams);
        }
    });

    // Flatten array and remove duplicates
    arr = _.uniq(_.flatten(arr));

    // Remove all blacklisted items
    _filterParamsOnPage = _.difference(arr, PageStore.getPageFilter().blacklist);
}

function _triggerFetchFilterData () {
    _.each(_filterParamsOnPage, function (el) {
        FilterActionCreators.fetchData(FilterConfig[el].action, el);
    });
}

function _setFilterData (filterData, filterParam) {
    if (!_filterDataOnPage[filterParam]) _filterDataOnPage[filterParam] = JSON.parse(filterData);
}

var PageFilterStore = assign({}, EventEmitter.prototype, {
    getFilterParamsOnPage: function () {
        return _filterParamsOnPage;
    },

    getFilterDataOnPage: function () {
        return _filterDataOnPage;
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
            _buildFilterArray(PageStore.getModulesOnPage());
            _triggerFetchFilterData();
            PageFilterStore.emitChange();
            break;

        case FilterConstants.FILTER_RECEIVE_DATA:
            _setFilterData(action.filterData, action.filterParam);
            PageFilterStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PageFilterStore;