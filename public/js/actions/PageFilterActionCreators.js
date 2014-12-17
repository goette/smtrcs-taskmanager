var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    PageFilterConstants = require('../constants/PageFilterConstants.js');

var PageFilterActionCreators = {
    update: function () {
        AppDispatcher.handleViewAction({
            actionType: PageFilterConstants.RECEIVE_PAGE_MODULES
        });
    }
};

module.exports = PageFilterActionCreators;