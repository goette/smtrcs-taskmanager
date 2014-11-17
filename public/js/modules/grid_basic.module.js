var React = require('react');
var Headline = require('../components/headline.component');
var RemoveButtonMixin = require('../_mixins/remove_button.mixin');
var _ = require('lodash');

var GridBasic = React.createClass({
    render: function () {
        var remove = RemoveButtonMixin(this.props.editMode, this.props.pageId),
            roles = 'Roles: ' + this.props.roles.join(', ');

        return (
            <div className="grid module">
                {remove}
                <Headline title={this.props.title} />
                <br />{roles}
            </div>
        );
    }
});

module.exports = GridBasic;