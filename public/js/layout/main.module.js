/**
 * @jsx React.DOM
 */

var React = require('react');
var Header = require('./header.module');
var Page = require('./page.module');

var Main = React.createClass({
    render: function () {
        return (
            <div className="container-fluid">
                <Header />
                <Page />
            </div>
        );
    }
});

module.exports = Main;