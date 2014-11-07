/**
 * @jsx React.DOM
 */

var React = require('react');
var Main = require('./layout/main.module');

window.React = React;

React.renderComponent(
    <Main />,
    document.getElementById('main')
);