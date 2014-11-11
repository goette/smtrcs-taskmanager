/*
 * ModuleStore
 */

var _ = require('lodash'),
    AppDispatcher = require('../_dispatcher/app.dispatcher.js'),
    EventEmitter = require('events').EventEmitter,
    PageConstants = require('../constants/page.constants.js'),
    merge = require('react/lib/merge'),
    CHANGE_EVENT = 'change',
    _moduleCollection = require('../_config/module_collection'),
    _initiallyOnPage = require('../_config/static_page').modulesOnPage, // This will become an ajax call
    _currentlyOnPage = [],
    _currentRole = 'c',
    _editMode = false,
    _addMode = false;

function joinPageArrays () {
    var arr = [],
        key,
        module,
        obj,
        i;

    for (i = 0; i < _initiallyOnPage.length; i++) {
        key = _initiallyOnPage[i].id;
        module = _.where(_moduleCollection, {id: key})[0];
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
    _currentlyOnPage = arr;
}

function toggleEditMode () {
   _editMode = !_editMode;
}

function toggleAddMode () {
    _addMode = !_addMode;
}

function setCurrentRole (role) {
    _currentRole = role[0].toLowerCase();
}

function removeModuleFromPage (moduleId) {
    _currentlyOnPage = _currentlyOnPage.filter(function (el) {
        return el.pageId !== moduleId;
    });
}

function addModuleToPage (moduleId) {
    var module = _.where(_moduleCollection, {id: moduleId})[0];
    module.pageId = _.uniqueId();
    module.className = module.defaultClassName;
    _currentlyOnPage.push(module);
    _addMode = false;
}

function filterModulesByRole () {
    var arr = _currentlyOnPage;

    arr = arr.filter(function (el) {
        return el.roles.indexOf(_currentRole) > -1;
    });

    return arr;
}

var PageStore = merge(EventEmitter.prototype, {
    /**
     * Get the entire collection of views.
     * @return {object}
     */
    getModulesOnPage: function () {
        return filterModulesByRole();
    },

    getEditMode: function () {
        return _editMode;
    },

    getAddMode: function () {
        return _addMode;
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
        case PageConstants.PAGE_INITIALIZE:
            joinPageArrays();
            PageStore.emitChange();
            break;

        case PageConstants.PAGE_TOGGLE_EDIT:
            toggleEditMode();
            PageStore.emitChange();
            break;

        case PageConstants.PAGE_TOGGLE_ADD:
            toggleAddMode();
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_FILTER_BY_ROLE:
            setCurrentRole(action.role);
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_ADD:
            addModuleToPage(action.moduleId);
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_REMOVE:
            removeModuleFromPage(action.moduleId);
            PageStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PageStore;