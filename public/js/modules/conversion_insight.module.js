/**
 * @jsx React.DOM
 */

var React = require('react');
var Headline = require('./components/headline.component');

var ConversionInside = React.createClass({
    render: function () {
        return (
            <div className={this.props.cx}>
                <Headline text="Conversion inside" />
            </div>
        );
    }
});

module.exports = ConversionInside;