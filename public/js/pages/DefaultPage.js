var React = require('react'),
    ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin'),
    _ = require('lodash'),
    AllModules = require('../modules/_AllModules'),
    PageActions = require('../actions/PageActionCreators.js'),
    PageStore = require('../stores/PageStore.js'),
    AddMenu = require('./../components/AddMenuComponent.js'),
    PageEditButtons = require('./../components/PageEditButtonsComponent.js'),
    Loader = require('./../components/SpinnerComponent.js'),
    PageFilter = require('../filter/PageFilter.js');

var Page = React.createClass({
    store: PageStore,

    mixins: [InitStoreInComponentMixin],

    getStateFromStore: function () {
        return {
            modules: this.store.getModulesOnPage(),
            moduleCollection: this.store.getModuleCollection(),
            pageFilter: this.store.getPageFilter(),
            editMode: this.store.getEditMode(),
            addMode: this.store.getAddMode()
        };
    },

    render: function () {
        var modules = null,
            addMenu = null,
            editButtons = null,
            pageEditButtons = null,
            loader = null,
            pageFilter = null,
            editMode;

        editMode = this.state.editMode;

        if (this.state.modules.length) {
            loader = null;
            modules = _.map(this.state.modules, function (module, i) {
                var dragging = (i == this.state.dragging) ? ' dragging' : '',
                    ModuleComponent = AllModules[module.type];

                return (
                    <div className={module.className + dragging}
                        key={module.pageId}
                        data-id={i}>
                        <ModuleComponent
                            key={i}
                            moduleId={module.id}
                            action={module.action}
                            background={module.background}
                            pageId={module.pageId}
                            editMode={editMode}
                            roles={module.roles}
                        />
                    </div>
                );
            }, this);
        } else {
            loader = <Loader />
        }

        if (this.state.addMode) {
            addMenu =  <AddMenu moduleCollection={this.state.moduleCollection} />
        } else {
            addMenu = null;
        }

        if (this.state.pageFilter) {
            pageFilter = <PageFilter />;
        } else {
            pageFilter = null;
        }

        pageEditButtons = <PageEditButtons key="pe1" editMode={this.state.editMode} addMode={this.state.addMode} />;

        return (
            <div className="row">
                {loader}
                {pageFilter}

                <ReactCSSTransitionGroup transitionName="module">
                    {modules}
                </ReactCSSTransitionGroup>

                {addMenu}
                {pageEditButtons}
            </div>
        );
    }
});

module.exports = Page;