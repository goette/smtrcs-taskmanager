var React = require('react'),
    TaskManagerActionCreators = require('../actions/TaskManagerActionCreators');

var CreateButton = React.createClass({
    _toggleInputForm: function () {
        TaskManagerActionCreators.toggleInputForm();
    },
    render: function () {
        var button = <button className='btn btn-default pull-right' onClick={this._toggleInputForm}>Create new task</button>;

        if (this.props.showInput) {
            button = <button className='btn btn-danger pull-right' onClick={this._toggleInputForm}>Cancel <i className="fa fa-times"></i></button>;
        }

        return button;
    }
});

var Header = React.createClass({
    render: function () {
        return (
            <div className="col-xs-12 overview">
                <CreateButton showInput={this.props.showInput} />
                <h4><i className="fa fa-th-list"></i> 5 Tasks sind Ihnen zugewiesen</h4>
            </div>
        )
    }
});

module.exports = Header;


