/**
 * @jsx React.DOM
 */

var React = require('react'),
    _ = require('lodash'),
    PageActions = require('../actions/page.actions'),
    PageStore = require('../stores/page.store'),
    AddMenu = require('./add_menu.layout_module'),
    PageEditButtons = require('../components/page_edit_buttons.component'),
    _moduleCollection = require('../_config/module_collection'),
    _initiallyOnPage = require('../_config/static_page').modulesOnPage; // This will become an ajax call

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

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

    _sort: function (modules, dragging) {
        this.state.modules = modules;
        this.state.dragging = dragging;
        PageActions.updateModulesOrder(modules);
    },

    _dragStart: function (e) {
        this._dragged = Number(e.currentTarget.dataset.id);
        e.dataTransfer.effectAllowed = 'move';
        // Firefox requires calling dataTransfer.setData
        // for the drag to properly work
        e.dataTransfer.setData("text/html", null);
    },

    _dragOver: function (e) {
        var over = e.currentTarget;
        var dragging = this.state.dragging;
        var from = isFinite(dragging) ? dragging : this._dragged;
        var to = Number(over.dataset.id);
        if((e.clientY - over.offsetTop) > (over.offsetHeight / 2) ||
            (e.clientX - over.offsetLeft) > (over.offsetWidth / 2)) {
            to++;
        }
        if(from < to) to--;

        // Move from 'a' to 'b'
        var items = this.state.modules;
        items.splice(to, 0, items.splice(from,1)[0]);
        this._sort(items, to);
    },

    _dragEnd: function () {
        this._sort(this.state.modules, undefined);
    },

    render: function () {
        var modules = '',
            addMenu = '',
            editButtons = '',
            pageEditButtons = '',
            editMode;

        if (this.state) {
            editMode = this.state.editMode;
            modules = _.map(this.state.modules, function (module, i) {
                var dragging = (i == this.state.dragging) ? ' dragging' : '';
                return (
                    <div className={module.className + dragging}
                        key={module.pageId}
                        data-id={i}
                        draggable={editMode}
                        onDragEnd={this._dragEnd}
                        onDragOver={this._dragOver}
                        onDragStart={this._dragStart}>
                        <module.type
                            title={module.id}
                            action={module.action}
                            pageId={module.pageId}
                            editMode={editMode}
                            roles={module.roles}
                        />
                    </div>
                );
            }, this);

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