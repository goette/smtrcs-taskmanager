var React = require('react'),
    TaskManagerActionCreators = require('../actions/TaskManagerActionCreators');

var CreateButton = React.createClass({
    _toggleInputForm: function () {
        TaskManagerActionCreators.toggleInputForm();
    },
    render: function () {
        var createText = 'Create new task',
            cancelText = 'Cancel',
            cx = 'btn btn-primary pull-right',
            button = <button className={cx} onClick={this._toggleInputForm}>{createText}</button>;

        if (this.props.showInput) {
            button = null;
        }

        return button;
    }
});

var Header = React.createClass({
    render: function () {
        var text = 'There are ' + this.props.amount + ' open tasks';

        if (this.props.amount === 1) {
            text = 'There is 1 open tasks';
        }

        return (
            <div className="col-xs-12 overview">
                <CreateButton showInput={this.props.showInput} />
                <h4><i className="fa fa-th-list"></i> {text}</h4>
            </div>
        );
    }
});

module.exports = Header;


