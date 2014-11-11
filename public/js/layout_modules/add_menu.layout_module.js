/**
 * @jsx React.DOM
 */

var React = require('react');
var PageStore = require('../stores/page.store');
var PageActions = require('../actions/page.actions');

function getAllModules () {
    return {
        modules: PageStore.getModuleCollection()
    };
}

var AddMenu = React.createClass({
    getInitialState: function () {
        return getAllModules();
    },

    render: function () {
        var moduleList = this.state.modules.map(function (module) {
            return(
                <ModuleItem moduleId={module.id} />
            );
        }.bind(this));

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
        return (
            <div className="add-menu-item">
                <button onClick={this._addToPage} className="btn btn-primary pull-right">+ Add to page</button>
                <strong>{this.props.moduleId}</strong>
            </div>
        );
    }
});

module.exports = AddMenu;