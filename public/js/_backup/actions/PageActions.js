var AppDispatcher = require('../dispatcher/AppDispatcher');
var PageConstants = require('../constants/PageConstants');

var PageActions = {
    addModule: function () {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.MODULE_ADD
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