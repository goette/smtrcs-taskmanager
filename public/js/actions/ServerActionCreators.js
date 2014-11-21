var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var PageConstants = require('../constants/PageConstants.js');
var ModuleConstants = require('../constants/ModuleConstants.js');
var PageFilterActions = require('../actions/PageFilterActionCreators.js');

var ServerActions = {
    receivePageConfig: function (moduleCollection, pageConfig) {
        AppDispatcher.handleServerAction({
            actionType: PageConstants.PAGE_RECEICVE_CONFIG,
            moduleCollection: moduleCollection,
            pageConfig: pageConfig
        });
        PageFilterActions.update();
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