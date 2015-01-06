var React = require('react'),
    TaskManagerActionCreators = require('../actions/TaskManagerActionCreators.js');

var Input = React.createClass({
    _addTask: function (e) {
        var title,
            description;

        if (e.keyCode === 13 || e.type === 'click') {
            title = this.refs.title.getDOMNode().value.trim();
            description = this.refs.description.getDOMNode().value.trim();
            if (title) TaskManagerActionCreators.add(title, description);
        }
    },
    _toggleInputForm: function () {
        this.refs.title.getDOMNode().value = '';
        this.refs.description.getDOMNode().value = '';
        TaskManagerActionCreators.toggleInputForm();
    },
    render: function () {
        return (
            <div className="col-xs-12 input">
                <input ref="title" type="text" className="form-control" placeholder="Enter title for new task" onKeyDown={this._addTask} />
                <textarea ref="description" className="form-control" rows="3" placeholder="Enter description for new task" onKeyDown={this._addTask}></textarea>
                <button className="btn btn-primary pull-right" onClick={this._addTask} >Add new task</button>
                <button className="btn btn-danger btn-cancel pull-right" onClick={this._toggleInputForm}>Cancel <i className="fa fa-times"></i></button>
            </div>
        );
    }
});

module.exports = Input;