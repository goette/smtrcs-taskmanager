var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    PageConstants = require('../constants/PageConstants.js'),
    PageFilterActionCreators = require('../actions/PageFilterActionCreators.js');

var PageActionCreators = {
    toggleEditMode: function () {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.PAGE_TOGGLE_EDIT
        });
    },
    toggleAddMode: function () {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.PAGE_TOGGLE_ADD
        });
    },
    setCurrentRole: function (role) {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.MODULE_FILTER_BY_ROLE,
            role: role
        });
    },
    addModule: function (moduleId) {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.MODULE_ADD,
            moduleId: moduleId
        });
        PageFilterActionCreators.update();
    },
    removeModule: function (moduleId) {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.MODULE_REMOVE,
            moduleId: moduleId
        });
        PageFilterActionCreators.update();
    },
    updateModulesOrder: function (modules) {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.PAGE_REORDER,
            modules: modules
        });
    }
};

module.exports = PageActionCreators;