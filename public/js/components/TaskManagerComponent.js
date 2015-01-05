var React = require('react'),
    _ = require('lodash'),
    TaskManagerStore = require('../stores/TaskManagerStore.js'),
    TaskManagerActionCreators = require('../actions/TaskManagerActionCreators.js');

var AddMenu = React.createClass({
    render: function () {
        var moduleList = _.map(this.props.moduleCollection, function (module, i) {
            return(
                <ModuleItem
                    key={i}
                    moduleId={module.id}
                    roles={module.roles}
                    cx={module.className}
                    background={module.background}
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
        var roles = this.props.roles.join(', '),
            cx = "add-menu-preview " + this.props.cx.split(' ').pop() + ' ' + this.props.background;
        return (
            <div className="add-menu-item">
                <div className={cx}>Preview</div>
                <button onClick={this._addToPage} className="btn btn-success">+ Add to page</button>
                <strong>{this.props.moduleId}</strong><br />
                <span>Roles: {roles}</span>
            </div>
        );
    }
});

module.exports = AddMenu;