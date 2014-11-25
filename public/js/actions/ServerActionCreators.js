var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var PageConstants = require('../constants/PageConstants.js');
var ModuleConstants = require('../constants/ModuleConstants.js');
var FilterConstants = require('../constants/FilterConstants.js');
var PageFilterActionCreators = require('../actions/PageFilterActionCreators.js');

var ServerActionCreators = {
    receivePageConfig: function (moduleCollection, pageConfig) {
        AppDispatcher.handleServerAction({
            actionType: PageConstants.PAGE_RECEICVE_CONFIG,
            moduleCollection: moduleCollection,
            pageConfig: pageConfig
        });
        PageFilterActionCreators.update();
    },

    receiveModuleData: function (data, id) {
        AppDispatcher.handleServerAction({
            actionType: ModuleConstants.MODULE_RECEIVE_DATA,
            moduleData: data,
            pageId: id
        });
    },

    receiveFilterData: function (data, filterParam) {
        AppDispatcher.handleServerAction({
            actionType: FilterConstants.FILTER_RECEIVE_DATA,
            filterData: data,
            filterParam: filterParam
        });
    }
};

module.exports = ServerActionCreators;