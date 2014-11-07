/**
 * @jsx React.DOM
 */

var React = require('react');
var ConversionInsight = require('../modules/conversion_insight.module');

var Page = React.createClass({
    render: function () {
        return (
            <div className="row">
                <ConversionInsight cx="col-sm-12 col-md-4 col-lg-3" />
                <ConversionInsight cx="col-sm-12 col-md-4 col-lg-3" />
                <ConversionInsight cx="col-sm-12 col-md-4 col-lg-3" />
                <ConversionInsight cx="col-sm-12 col-md-4 col-lg-3" />
                <ConversionInsight cx="col-sm-12 col-md-6" />
                <ConversionInsight cx="col-sm-12 col-md-6" />
                <ConversionInsight cx="col-sm-12 col-md-12" />
            </div>
        );
    }
});

module.exports = Page;