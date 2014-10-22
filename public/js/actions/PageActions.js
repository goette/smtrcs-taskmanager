var AppDispatcher = require('../dispatcher/AppDispatcher');
var PageConstants = require('../constants/PageConstants');

var PageActions = {
    addModule: function (word) {
        AppDispatcher.handleViewAction({
            actionType: PageConstants.MODULE_ADD,
            word: word
        });
    }
};

module.exports = PageActions;