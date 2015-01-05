var React = require('react'),
    _ = require('lodash'),
    TaskManagerStore = require('../stores/TaskManagerStore.js'),
    TaskManagerActionCreators = require('../actions/TaskManagerActionCreators.js');

var TaskManager = React.createClass({
    render: function () {
        return (
            <div className="taskmanager row">
                <div className="col-xs-4">
                    <h3>Sidebar</h3>
                </div>
                <div className="col-xs-8">
                    <h3>TaskList</h3>
                </div>
            </div>
        );
    }
});

module.exports = TaskManager;