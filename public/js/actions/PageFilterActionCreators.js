var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var PageFilterConstants = require('../constants/PageFilterConstants.js');

var PageFilterActions = {
    update: function () {
        AppDispatcher.handleViewAction({
            actionType: PageFilterConstants.RECEIVE_PAGE_MODULES
        });
    }
};

module.exports = PageFilterActions;