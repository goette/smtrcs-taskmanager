/**
 * @jsx React.DOM
 */

var React = require('react');
var Header = require('./layout_modules/header.layout_module');
var Page = require('./layout_modules/page.layout_module');
var EditMenu = require('./layout_modules/add_menu.layout_module.js');

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


React.render(
    <Main />,
    document.getElementById('main')
);