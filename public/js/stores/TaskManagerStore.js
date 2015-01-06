var _ = require('lodash'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    TaskManagerConstants = require('../constants/TaskManagerConstants'),
    EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    CHANGE_EVENT = 'change',
    _showInput = false,
    _taskList = [];

function _toggleShowInput () {
    _showInput = !_showInput;
}

function _setInitialTasks (initialTasks) {
    _taskList = initialTasks;
}

function _setCompleted (taskId) {
    var task = _.find(_taskList, {id: taskId});
    task.completed = !task.completed;
}

function _add (title, description) {
    _taskList.unshift({
        id: 'task' + _.uniqueId(),
        title: title,
        description: description,
        completed: false
    });
    _showInput = false;
    localStorage.clear();
    localStorage.setItem('taskCollection', JSON.stringify(_taskList));
}

function _delete (taskId) {
    _taskList = _.reject(_taskList, {id: taskId});
    localStorage.clear();
    localStorage.setItem('taskCollection', JSON.stringify(_taskList));
}

function _sort (dir) {
    _taskList = _.sortBy(_taskList, 'title');

    if (dir === 'desc') {
        _taskList.reverse();
    }
}

var TaskManagerStore = assign({}, EventEmitter.prototype, {
    getShowInput: function () {
        return _showInput;
    },

    getTasks: function () {
        return _taskList;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register to handle all updates
TaskManagerStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case TaskManagerConstants.TASK_INITIALIZE:
            _setInitialTasks(action.initialTasks);
            TaskManagerStore.emitChange();
            break;

        case TaskManagerConstants.TASK_DELETE:
            _delete(action.taskId);
            TaskManagerStore.emitChange();
            break;

        case TaskManagerConstants.TASK_ADD:
            _add(action.title, action.description);
            TaskManagerStore.emitChange();
            break;

        case TaskManagerConstants.TASK_TOGGLE_INPUT:
            _toggleShowInput();
            TaskManagerStore.emitChange();
            break;

        case TaskManagerConstants.TASK_TOGGLE_COMPLETE:
            _setCompleted(action.taskId);
            TaskManagerStore.emitChange();
            break;

        case TaskManagerConstants.TASK_SORT:
            _sort(action.dir);
            TaskManagerStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = TaskManagerStore;