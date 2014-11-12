/**
 * @jsx React.DOM
 */

var React = require('react');
var Headline = require('../components/headline.component');
var _ = require('lodash');
var RemoveButtonMixin = require('../_mixins/remove_button.mixin');

var KpiBasic = React.createClass({
    render: function () {
        var remove = RemoveButtonMixin(this.props.editMode, this.props.pageId),
            roles = 'Roles: ' + this.props.roles.join(', ');

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