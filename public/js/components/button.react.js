/**
 * @jsx React.DOM
 */
var PageActions = require('../actions/PageActions');

var React = require('react');

var Button = React.createClass({
    _onClick: function () {
        PageActions.addModule('test');
    },
    render: function () {
        return(
            <button onClick={this._onClick} type="button" className="btn btn-default btn-lg">
                Add random module
            </button>
        );
    }
});

module.exports = Button;