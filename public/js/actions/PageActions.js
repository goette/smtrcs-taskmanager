var AppDispatcher = require('../dispatcher/AppDispatcher');
var PageConstants = require('../constants/PageConstants');

var PageActions = {
    addModule: function () {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.MODULE_ADD
        });
    }
};

module.exports = PageActions;