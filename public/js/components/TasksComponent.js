var React = require('react'),
    TaskManagerActionCreators = require('../actions/TaskManagerActionCreators');

var Task = React.createClass({
    _toggleCompleted: function () {
        TaskManagerActionCreators.toggleCompleted(this.props.task.id);
    },

    _delete: function () {
        TaskManagerActionCreators.delete(this.props.task.id);
    },

    render: function () {
        var checked = '',
            description = null;

        if (this.props.task.completed) {
            checked = 'checked';
        }

        if (this.props.task.description) {
            description = <span>{this.props.task.description}</span>;
        }

        return (
            <li className={checked}>
                <input onChange={this._toggleCompleted} type="checkbox" />
                <strong>{this.props.task.title}</strong>
                {description}
                <p className="delete" onClick={this._delete}><i className="fa fa-times"></i></p>
            </li>
        );
    }
});

var Tasks = React.createClass({
    render: function () {
        var tasks;

        if (this.props.tasks) {
            tasks = this.props.tasks.map(function (task, i) {
                return <Task key={i} task={task} />
            }, this);
        }

        return (
            <div className="col-xs-12 task-list">
                <ul>
                    {tasks}
                </ul>
            </div>
        );
    }
});

module.exports = Tasks;