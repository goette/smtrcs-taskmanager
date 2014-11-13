/**
 * @jsx React.DOM
 */

var React = require('react');
var PageStore = require('../stores/page.store');
var PageActions = require('../actions/page.actions');

var AddMenu = React.createClass({
    render: function () {
        var moduleList = this.props.moduleCollection.map(function (module) {
            return(
                <ModuleItem
                    moduleId={module.id}
                    roles={module.roles}
                />
            );
        });

        return (
            <div className="add-menu">
                {moduleList}
            </div>
        );
    }
});

var ModuleItem = React.createClass({
    _addToPage: function (e) {
        PageActions.addModule(this.props.moduleId);
    },
    render: function () {
        var roles = this.props.roles.join(', ');
        return (
            <div className="add-menu-item">
                <button onClick={this._addToPage} className="btn btn-success pull-right">+ Add to page</button>
                <strong>{this.props.moduleId}</strong><br />
                <span>Roles: {roles}</span>
            </div>
        );
    }
});

module.exports = AddMenu;