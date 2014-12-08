var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    PageConstants = require('../constants/PageConstants.js'),
    PageFilterActionCreators = require('../actions/PageFilterActionCreators.js'),
    ApiUtils = require('../utils/ApiUtils');

var PageActionCreators = {
    toggleEditMode: function (editMode) {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.PAGE_TOGGLE_EDIT
        });
        if (editMode) ApiUtils.savePageConfig();
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
        ApiUtils.savePageConfig();
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