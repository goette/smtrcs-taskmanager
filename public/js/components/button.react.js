/**
 * @jsx React.DOM
 */
var PageActions = require('../actions/PageActions');

var React = require('react');
var $ = require('jquery');

var Button = React.createClass({
    _onClick: function (e) {
        console.log($(this.getDOMNode()));
        PageActions.addModule();
    },
    render: function () {
        return(
            <button onClick={this._onClick} type="button" className="btn btn-primary btn-lg">
                Add random module
            </button>
        );
    }
});

module.exports = Button;