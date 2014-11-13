/*
 * ModuleStore
 */

var _ = require('lodash'),
    AppDispatcher = require('../_dispatcher/app.dispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    PageConstants = require('../constants/page.constants.js'),
    merge = require('react/lib/merge'),
    CHANGE_EVENT = 'change',
    _currentlyOnPage = [],
    _moduleCollection = [],
    _currentRole = 'c',
    _mode = {
        edit: false,
        add: false
    };

function joinPageArrays (moduleCollection, initiallyOnPage) {
    var arr = [],
        key,
        module,
        obj,
        i;

    _moduleCollection = moduleCollection;

    for (i = 0; i < initiallyOnPage.length; i++) {
        key = initiallyOnPage[i].id;
        module = _.where(_moduleCollection, {id: key})[0];

        if (module) {
            obj = {
                id: key,
                type: module.type,
                action: module.action,
                roles: module.roles,
                pageId: _.uniqueId(),
                className: module.defaultClassName
            }
            arr.push(obj);
        }
    }
    _currentlyOnPage = arr;
}

function toggleMode (val) {
    _mode[val] = !_mode[val];
}

function setCurrentRole (role) {
    _currentRole = role[0].toLowerCase();
}

function removeModuleFromPage (moduleId) {
    _currentlyOnPage = _currentlyOnPage.filter(function (el) {
        return el.pageId !== moduleId;
    });
}

function addModuleToPage (moduleCollection, currentlyOnPage, moduleId) {
    var module = _.where(moduleCollection, {id: moduleId})[0];
    module.pageId = _.uniqueId();
    module.className = module.defaultClassName;
    currentlyOnPage.push(module);
    _mode.add = false;
}

function filterByRole (arr) {
    arr = arr.filter(function (el) {
        return el.roles.indexOf(_currentRole) > -1;
    });

    return arr;
}

function updateCurrentlyOnPage (modules) {
    _currentlyOnPage = modules;
}

var PageStore = merge(EventEmitter.prototype, {
    /**
     * Get the entire collection of views.
     * @return {object}
     */
    getModulesOnPage: function () {
        return filterByRole(_currentlyOnPage);
    },

    getModuleCollection: function () {
        return filterByRole(_moduleCollection);
    },

    getEditMode: function () {
        return _mode.edit;
    },

    getAddMode: function () {
        return _mode.add;
    },

    getCurrentRole: function () {
        return _currentRole;
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
        case PageConstants.PAGE_INITIALIZE:
            joinPageArrays(action.moduleCollection, action.initiallyOnPage);
            PageStore.emitChange();
            break;

        case PageConstants.PAGE_TOGGLE_EDIT:
            toggleMode('edit');
            PageStore.emitChange();
            break;

        case PageConstants.PAGE_TOGGLE_ADD:
            toggleMode('add');
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_FILTER_BY_ROLE:
            setCurrentRole(action.role);
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_ADD:
            addModuleToPage(_moduleCollection, _currentlyOnPage, action.moduleId);
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_REMOVE:
            removeModuleFromPage(action.moduleId);
            PageStore.emitChange();
            break;

        case PageConstants.PAGE_REORDER:
            updateCurrentlyOnPage(action.modules);
            PageStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PageStore;