/**
 * @jsx React.DOM
 */

var Main = require('./component/main');
var React = require('react');

React.renderComponent(
    <Main />,
    document.getElementById('main')
);