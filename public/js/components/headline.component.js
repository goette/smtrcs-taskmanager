/**
 * @jsx React.DOM
 */

var React = require('react');

var Headline = React.createClass({
    render: function () {
        return (
            <h1>{this.props.text}</h1>
        );
    }
});

module.exports = Headline;