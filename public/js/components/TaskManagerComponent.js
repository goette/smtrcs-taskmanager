var React = require('react'),
    _ = require('lodash'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin'),
    Header = require('./HeaderComponent'),
    Input = require('./InputComponent'),
    Tasks = require('./TasksComponent'),
    TaskManagerStore = require('../stores/TaskManagerStore.js'),
    TaskManagerActionCreators = require('../actions/TaskManagerActionCreators.js');

var TaskManager = React.createClass({
    store: TaskManagerStore,

    mixins: [InitStoreInComponentMixin],

    componentDidMount: function () {
        TaskManagerActionCreators.setInitialTasks(JSON.parse(localStorage.getItem('taskCollection')));
    },

    getStateFromStore: function () {
        return {
            tasks: this.store.getTasks(),
            showInput: this.store.getShowInput()
        };
    },

    _sortAsc: function () {
        TaskManagerActionCreators.sort('asc');
    },

    _sortDesc: function () {
        TaskManagerActionCreators.sort('desc');
    },

    render: function () {
        var inputField = null,
            tasks = null,
            amount = 0;

        if (this.state.showInput) {
            inputField = <Input />
        }

        if (this.state.tasks) {
            this.state.tasks.forEach(function (task) {
                if (!task.completed) amount++;
            }, this);
        }

        return (
            <div className="taskmanager row">
                <Header showInput={this.state.showInput} amount={amount} />
                {inputField}
                <Tasks tasks={this.state.tasks} />
                <div className="col-xs-12 footer">
                    <span onClick={this._sortAsc}><i className="fa fa-sort-alpha-asc"></i> Sort asc</span>
                    <span onClick={this._sortDesc}><i className="fa fa-sort-alpha-desc"></i> Sort desc</span>
                </div>
            </div>
        );
    }
});

module.exports = TaskManager;