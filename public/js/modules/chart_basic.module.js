/**
 * @jsx React.DOM
 */

var React = require('react');
var Headline = require('../components/headline.component');
var RemoveModule = require('../components/remove_module.component');

var ConversionInside = React.createClass({
    render: function () {
        var remove = '',
            roles = 'Roles: ' + this.props.roles.join(', ');

        if (this.props.editMode) {
            remove = <RemoveModule pageId={this.props.pageId} />;
        }

        return (
            <div className={this.props.cx}>
                <div className="chart module">
                    {remove}
                    <Headline text={this.props.title} />
                    <img src="/images/chart.png" />
                </div>
            </div>
        );
    }
});

module.exports = ConversionInside;