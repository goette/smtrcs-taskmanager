var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    TaskManagerConstants = require('../constants/TaskManagerConstants');

var TaskManagerActionCreators = {
    toggleInputForm: function (navigationConfig) {
        AppDispatcher.handleViewAction({
            actionType: TaskManagerConstants.TASK_INPUT_TOGGLE
        });
    },
};

module.exports = TaskManagerActionCreators;