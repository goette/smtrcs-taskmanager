/**
 * @jsx React.DOM
 */

var React = require('react');

var Header = React.createClass({
    render: function () {
        return (
            <nav className="header navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    Prototype v.1
                </div>
            </nav>
        );
    }
});

module.exports = Header;