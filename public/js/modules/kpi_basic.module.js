/**
 * @jsx React.DOM
 */

var React = require('react');
var Headline = require('../components/headline.component');
var RemoveModule = require('../components/remove_module.component');
var _ = require('lodash');

var KpiBasic = React.createClass({
    render: function () {
        var remove = '',
            roles = 'Roles: ' + this.props.roles.join(', ');

        if (this.props.editMode) {
            remove = <RemoveModule pageId={this.props.pageId} />;
        }

        return (
            <div className={this.props.cx}>
                <div className="kpi module">
                    {remove}
                    <Headline title={this.props.title} />
                    <br />{roles}
                </div>
            </div>
        );
    }
});

module.exports = KpiBasic;