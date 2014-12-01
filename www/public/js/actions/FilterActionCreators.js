var ApiUtils = require('../utils/ApiUtils.js'),
    AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    FilterConstants = require('../constants/FilterConstants.js');

var FilterActionCreators = {
    fetchData: function (url, filterParam) {
        ApiUtils.getFilterData(url, filterParam);
    }
};

module.exports = FilterActionCreators;