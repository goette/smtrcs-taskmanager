var React = require('react');
var PageActions = require('../actions/page.actions');

var removeModule = React.createClass({
    _deleteMe: function () {
        PageActions.removeModule(this.props.pageId);
    },
    render: function () {
        return (
            <button onClick={this._deleteMe} className="btn-delete btn btn-default pull-right">{'\u2a09'}</button>
        );
    }
});

module.exports = removeModule;