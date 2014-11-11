/**
 * @jsx React.DOM
 */

var React = require('react');
var PageActions = require('../actions/page.actions');

var removeModule = React.createClass({
    _deleteMe: function () {
        PageActions.removeModule(this.props.pageId);
    },
    render: function () {
        return (
            <button onClick={this._deleteMe} className="btn-delete btn btn-danger pull-right">Delete Me</button>
        );
    }
});

module.exports = removeModule;