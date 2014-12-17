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
    _parentId = {
        current: 0,
        old: null
    },
    _initialPath = '',
    _flatNavigation = [];

function _toggleMenuIsOpen (force) {
    if (force) {
        _menuIsOpen = false;
    } else {
        _menuIsOpen = !_menuIsOpen;
    }
}

// parent and tree are needed by recursion
function _unflattenNavigationElements (array, parent, tree) {
    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : {id: 0};

    var children = _.filter(_.clone(array), function (child) {
        return child.parentId === parent.id;
    });

    if(!_.isEmpty(children)){
        if (parent.id === 0) {
            tree = children;
        } else {
            parent['children'] = children
        }
        _.each(children, function (child) {
            _unflattenNavigationElements(array, child)
        });
    }
}

function _setParentId (parentId) {
    if (typeof parentId !== 'undefined') {
        _parentId.old = _parentId.current;
        _parentId.current = parentId;
    } else {
        _parentId.old = null;
        _parentId.current = 0;
    }
}

function _setInitialPath (path) {
    _initialPath = path.substr(1);
}

var NavigationStore = assign({}, EventEmitter.prototype, {
    getMenuIsOpen: function () {
        return _menuIsOpen;
    },

    getParentId: function () {
        return _parentId;
    },

    getNavigation: function () {
        return _flatNavigation;
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
        case NavigationConstants.NAVIGATION_RECEICVE_CONFIG:
            _flatNavigation = action.navigationConfig;

            var currentObj = _.find(_flatNavigation, {path: _initialPath});
            if (currentObj) {
                _parentId.current = currentObj['parentId'];
                _parentId.old = null;
            }

            _unflattenNavigationElements(_flatNavigation); // this would be the nav response obj
            NavigationStore.emitChange();
            break;

        case NavigationConstants.NAVIGATION_TOGGLE:
            _toggleMenuIsOpen(action.force);
            NavigationStore.emitChange();
            break;

        case NavigationConstants.NAVIGATION_SET_PARENTID:
            _setParentId(action.parentId);
            NavigationStore.emitChange();
            break;

        case NavigationConstants.NAVIGATION_SET_INITIAL_PATH:
            _setInitialPath(action.path);
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = NavigationStore;