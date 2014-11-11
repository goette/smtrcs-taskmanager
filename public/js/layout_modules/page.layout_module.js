/**
 * @jsx React.DOM
 */

var React = require('react');
var PageActions = require('../actions/page.actions');
var PageStore = require('../stores/page.store');
var AddMenu = require('./add_menu.layout_module');
var PageEditButtons = require('../components/page_edit_buttons.component');

function getPageState () {
    return {
        modules: PageStore.getModulesOnPage(),
        editMode: PageStore.getEditMode(),
        addMode: PageStore.getAddMode()
    };
}

var Page = React.createClass({
    getInitialState: function () {
        return null;
    },

    componentDidMount: function () {
        PageStore.addChangeListener(this._onChange);
        PageActions.initialize();
    },

    componentWillUnmount: function () {
        PageStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(getPageState());
    },

    render: function () {
        var modules = '',
            addMenu = '',
            editButtons = '',
            pageEditButtons = '';

        if (this.state) {
            modules = this.state.modules.map(function (module) {
                return (
                    <module.type
                        title={module.id}
                        cx={module.className}
                        action={module.action}
                        pageId={module.pageId}
                        editMode={this.state.editMode}
                        roles={module.roles}
                    />
                );
            }.bind(this));

            addMenu = this.state.addMode ? <AddMenu /> : '';
            pageEditButtons = <PageEditButtons editMode={this.state.editMode} addMode={this.state.addMode} />;
        }

        return (
            <div className="row">
                {modules}
                {addMenu}
                {pageEditButtons}
            </div>
        );
    }
});

module.exports = Page;