var AppDispatcher = require('../_dispatcher/app.dispatcher');
var PageFilterConstants = require('../constants/page_filter.constants');

var PageFilterActions = {
    initialize: function (modulesOnPage) {
        AppDispatcher.handleViewAction({
            actionType: PageFilterConstants.PAGE_FILTER_INITIALIZE
        });
    }
};

module.exports = PageFilterActions;