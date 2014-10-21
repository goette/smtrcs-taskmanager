/**
 * @jsx React.DOM
 */

var React = require('react');
var Module = require('./module');
var Intro = require('./intro');

var onThisPage = [
    {
        key: 'kpi',
        name: 'KPI'
    },
    {
        key: 'grid',
        name: 'Grid'
    },
    {
        key: 'chart',
        name: 'Chart'
    }
];

var Main = React.createClass({
    render: function () {
        var nodes = onThisPage.map(function (node) {
            return (
                <Module
                    name={node.name}
                    key={node.key}
                />
            );
        }.bind(this));

        return(
            <div className="module-container">
                <Intro />
                {nodes}
            </div>
        );
    }
});

module.exports = Main;