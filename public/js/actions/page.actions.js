var AppDispatcher = require('../_dispatcher/app.dispatcher');
var PageConstants = require('../constants/page.constants');

var PageActions = {
    initialize: function (moduleCollection, initiallyOnPage) {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.PAGE_INITIALIZE,
            moduleCollection: moduleCollection,
            initiallyOnPage: initiallyOnPage
        });
    },
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
    },
    removeModule: function (moduleId) {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.MODULE_REMOVE,
            moduleId: moduleId
        });
    }
};

module.exports = PageActions;