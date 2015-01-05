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

var TaskManagerStore = assign({}, EventEmitter.prototype, {
    getShowInput: function () {
        return _showInput;
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
        case TaskManagerConstants.TASK_INPUT_TOGGLE:
            _toggleShowInput();
            TaskManagerStore.emitChange();
            break;

        default:
            return true;
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = TaskManagerStore;