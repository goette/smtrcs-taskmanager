/**
 * @jsx React.DOM
 */

var React = require('react');
var Header = require('./layout_modules/header.layout_module.js');
var Page = require('./layout_modules/page.layout_module.js');

// For React DevTools
window.React = React;

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

React.renderComponent(
    <Main />,
    document.getElementById('main')
);