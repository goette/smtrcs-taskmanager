var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var PageConstants = require('../constants/PageConstants.js');
var ModuleConstants = require('../constants/ModuleConstants.js');

var ServerActions = {
    receivePageConfig: function (moduleCollection, initiallyOnPage) {
        AppDispatcher.handleServerAction({
            actionType: PageConstants.PAGE_RECEICVE_CONFIG,
            moduleCollection: moduleCollection,
            initiallyOnPage: initiallyOnPage
        });
    },

    receiveModuleData: function (data, id) {
        AppDispatcher.handleServerAction({
            actionType: ModuleConstants.MODULE_RECEIVE_DATA,
            moduleData: data,
            pageId: id
        });
    }
};

module.exports = ServerActions;