var AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    TaskManagerConstants = require('../constants/TaskManagerConstants');

var TaskManagerActionCreators = {
    toggleInputForm: function () {
        AppDispatcher.handleViewAction({
            actionType: TaskManagerConstants.TASK_TOGGLE_INPUT
        });
    },
    toggleCompleted: function (taskId) {
        AppDispatcher.handleViewAction({
            actionType: TaskManagerConstants.TASK_TOGGLE_COMPLETE,
            taskId: taskId
        });
    },
    add: function (title, description) {
        AppDispatcher.handleViewAction({
            actionType: TaskManagerConstants.TASK_ADD,
            title: title,
            description: description
        });
    },
    delete: function (taskId) {
        AppDispatcher.handleViewAction({
            actionType: TaskManagerConstants.TASK_DELETE,
            taskId: taskId
        });
    },
    sort: function (dir) {
        AppDispatcher.handleViewAction({
            actionType: TaskManagerConstants.TASK_SORT,
            dir: dir
        });
    },
    setInitialTasks: function (initialTasks) {
        AppDispatcher.handleViewAction({
            actionType: TaskManagerConstants.TASK_INITIALIZE,
            initialTasks: initialTasks
        });
    }
};

module.exports = TaskManagerActionCreators;