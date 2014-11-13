/**
 * @jsx React.DOM
 */

var React = require('react'),
    PageActions = require('../actions/page.actions'),
    PageStore = require('../stores/page.store'),
    AddMenu = require('./add_menu.layout_module'),
    PageEditButtons = require('../components/page_edit_buttons.component'),
    _moduleCollection = require('../_config/module_collection'),
    _initiallyOnPage = require('../_config/static_page').modulesOnPage; // This will become an ajax call

function getPageState () {
    return {
        modules: PageStore.getModulesOnPage(),
        moduleCollection: PageStore.getModuleCollection(),
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
        PageActions.initialize(_moduleCollection, _initiallyOnPage);
    },

    componentWillUnmount: function () {
        PageStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(getPageState());
    },

    _dragStart: function () {

    },

    _dragEnd: function () {

    },

    render: function () {
        var modules = '',
            addMenu = '',
            editButtons = '',
            pageEditButtons = '',
            editMode;

        if (this.state) {
            editMode = this.state.editMode;
            modules = this.state.modules.map(function (module, i) {
                return (
                    <div className={module.className}
                        data-id={this.props.i}
                        draggable={editMode}
                        onDragEnd={this._dragEnd}
                        onDragStart={this._dragStart}>
                        <module.type
                            key={module.pageId}
                            title={module.id}
                            action={module.action}
                            pageId={module.pageId}
                            editMode={editMode}
                            roles={module.roles}
                        />
                    </div>
                );
            }.bind(this));

            if (this.state.addMode) {
                addMenu =  <AddMenu moduleCollection={this.state.moduleCollection} />
            } else {
                addMenu = '';
            }

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