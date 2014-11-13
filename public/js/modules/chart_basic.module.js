/**
 * @jsx React.DOM
 */

var React = require('react');
var Headline = require('../components/headline.component');
var RemoveButtonMixin = require('../_mixins/remove_button.mixin');

var ConversionInside = React.createClass({
    render: function () {
        var remove = RemoveButtonMixin(this.props.editMode, this.props.pageId),
            roles = 'Roles: ' + this.props.roles.join(', ');

        return (
            <div className={this.props.cx}>
                <div className="chart module">
                    {remove}
                    <Headline title={this.props.title} />
                    <img src="../images/chart.png" />
                </div>
            </div>
        );
    }
});

module.exports = ConversionInside;