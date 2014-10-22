/**
 * @jsx React.DOM
 */

var Main = require('./components/main.react');
var React = require('react');

window.React = React;

React.renderComponent(
    <Main />,
    document.getElementById('main')
);