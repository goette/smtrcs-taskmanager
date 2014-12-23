var _ = require('lodash'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    NavigationStore = require('../stores/NavigationStore'),
    EventEmitter = require('events').EventEmitter,
    PageConstants = require('../constants/PageConstants'),
    PageFilterActions = require('../actions/PageFilterActionCreators'),
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _currentlyOnPage = [],
    _moduleCollection = [],
    _pageConfig = {},
    _currentRole = 'c',
    _mode = {
        edit: '',
        add: ''
    };

function _buildPageArrays (moduleCollection, pageConfig) {
    var arr = [],
        obj,
        key,
        module,
        val,
        i;

    // Merge arrays to generate currentlyOnPage array
    for (i = 0; i < pageConfig.modulesOnPage.length; i++) {
        obj = {};
        key = pageConfig.modulesOnPage[i].id;
        module = _.find(moduleCollection, {id: key});

        if (module) {
            for (val in module) {
                obj[val] = module[val]
;           }

            if (pageConfig.modulesOnPage[i].visualization) {
                obj.visualization = pageConfig.modulesOnPage[i].visualization;
            }

            if (!obj.moduleIdOnPage) {
                obj.moduleIdOnPage = 'module-' + _.uniqueId();
            }

            arr.push(obj);
        }
    }
    _currentlyOnPage = arr;

    // Store moduleCollection and pageCollection, so it is available for later
    _moduleCollection = moduleCollection;
    _pageConfig = pageConfig;
}

function _toggleMode (val) {
    _mode[val] = !_mode[val];
}

function _clearPageStore () {
    _pageConfig = {};
    _currentlyOnPage = [];
}

function _setCurrentRole (role) {
    _currentRole = role[0].toLowerCase();
}

function _removeModuleFromPage (moduleIdOnPage) {
    _currentlyOnPage = _.reject(_currentlyOnPage, {moduleIdOnPage: moduleIdOnPage});
    _updatePageConfig();
}

function _addModuleToPage (moduleCollection, currentlyOnPage, moduleId) {
    var module = _.find(moduleCollection, {id: moduleId});

    if (!module.moduleIdOnPage) {
        module.moduleIdOnPage = 'module-' + _.uniqueId();
    }

    module.className = module.className;
    currentlyOnPage.unshift(module);
    _updatePageConfig();
    _mode['add'] = '';
}

function _updatePageConfig () {
    _pageConfig.modulesOnPage = _.map(_currentlyOnPage , function (el) {return _.pick(el, 'id', 'visualization', 'moduleIdOnPage')});
}

function _filterByRole (arr) {
    return _.filter(arr, function (el) { return el.roles.indexOf(_currentRole) > -1; });
}

function _updateCurrentlyOnPage (modules) {
    _currentlyOnPage = modules;
}

function _updateVisualization (moduleId, visualization) {
    _.find(_currentlyOnPage, {moduleIdOnPage: moduleId})['visualization'] = visualization;
    _updatePageConfig();
}

var PageStore = assign({}, EventEmitter.prototype, {
    getModulesOnPage: function () {
        return _filterByRole(_currentlyOnPage);
    },

    getModuleCollection: function () {
        return _filterByRole(_moduleCollection);
    },

    getModuleByIdOnPage: function (moduleIdOnPage) {
        return _.find(_currentlyOnPage, {moduleIdOnPage: moduleIdOnPage});
    },

    getCurrentPageConfig: function () {
        return _pageConfig;
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

    getPageFilter: function () {
        return _pageConfig.pageFilter;
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
PageStore.dispatchToken = AppDispatcher.register(function (payload) {
    AppDispatcher.waitFor([
        NavigationStore.dispatchToken
    ]);

    var action = payload.action;
    switch (action.actionType) {
        case PageConstants.PAGE_RECEICVE_CONFIG:
            if (action.moduleCollection) {
                _buildPageArrays(action.moduleCollection, action.pageConfig);
            } else {
                _buildPageArrays(false);
            }
            PageStore.emitChange();
            break;

        case PageConstants.PAGE_TOGGLE_EDIT:
            _toggleMode('edit');
            PageStore.emitChange();
            break;

        case PageConstants.PAGE_TOGGLE_ADD:
            _toggleMode('add');
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_FILTER_BY_ROLE:
            _setCurrentRole(action.role);
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_ADD:
            _addModuleToPage(_moduleCollection, _currentlyOnPage, action.moduleId);
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_REMOVE:
            _removeModuleFromPage(action.moduleId);
            PageStore.emitChange();
            break;

        case PageConstants.MODULE_SWITCH_VISUALIZATION:
            _updateVisualization(action.moduleId, action.visualization);
            PageStore.emitChange();
            break;

        case PageConstants.PAGE_REORDER:
            _updateCurrentlyOnPage(action.modules);
            PageStore.emitChange();
            break;

        case PageConstants.PAGE_CLEAR:
            _clearPageStore();
            PageStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = PageStore;