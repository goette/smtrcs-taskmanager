var ApiUtils = require('../utils/ApiUtils.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var ModuleConstants = require('../constants/ModuleConstants.js');

var ModuleActions = {
    fetchData: function (url, moduleId) {
        ApiUtils.getModuleData(url, moduleId);
    }
};

module.exports = ModuleActions;