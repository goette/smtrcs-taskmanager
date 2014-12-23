var ApiUtils = require('../utils/ApiUtils.js'),
    AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    ModuleConstants = require('../constants/ModuleConstants.js');

var ModuleActionCreators = {
    fetchData: function (url, moduleId) {
        ApiUtils.getModuleData(url, moduleId);
    }
};

module.exports = ModuleActionCreators;