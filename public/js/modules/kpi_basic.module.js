/**
 * @jsx React.DOM
 */

var React = require('react');
var Headline = require('../components/headline.component');
var RemoveModule = require('../components/remove_module.component');

var ConversionInside = React.createClass({
    render: function () {
        return (
            <div className={this.props.cx}>
                <div className="kpi module">
                    <RemoveModule pageId={this.props.pageId} />
                    <Headline text={this.props.title} />
                    <div>Action: {this.props.action}</div>
                </div>
            </div>
        );
    }
});

module.exports = ConversionInside;