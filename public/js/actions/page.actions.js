var AppDispatcher = require('../_dispatcher/app.dispatcher');
var PageConstants = require('../constants/page.constants');

var PageActions = {
    initialize: function () {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.PAGE_INITIALIZE
        });
    },
    setCurrentRole: function (role) {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.MODULE_FILTER_BY_ROLE,
            role: role
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