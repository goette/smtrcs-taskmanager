var ApiUtils = require('../utils/ApiUtils.js');
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var FilterConstants = require('../constants/FilterConstants.js');

var FilterActionCreators = {
    fetchData: function (url, filterParam) {
        ApiUtils.getFilterData(url, filterParam);
    }
};

module.exports = FilterActionCreators;