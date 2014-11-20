var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var PageFilterConstants = require('../constants/PageFilterConstants.js');

var PageFilterActions = {
    initialize: function (modulesOnPage) {
        AppDispatcher.handleViewAction({
            actionType: PageFilterConstants.PAGE_FILTER_INITIALIZE
        });
    }
};

module.exports = PageFilterActions;