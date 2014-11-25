var React = require('react');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin');
var _ = require('lodash');
var AllModules = require('../modules/_AllModules');
var PageActions = require('../actions/PageActionCreators');
var PageStore = require('../stores/PageStore');
var AddMenu = require('./../components/AddMenuComponent');
var PageEditButtons = require('./../components/PageEditButtonsComponent');
var Loader = require('./../components/SpinnerComponent');
var PageFilter = require('../filter/PageFilter');

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
                        key={module.moduleIdOnPage}
                        data-id={i}>
                        <ModuleComponent
                            key={i}
                            moduleId={module.id}
                            action={module.action}
                            background={module.background}
                            moduleIdOnPage={module.moduleIdOnPage}
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
            pageFilter = <div></div>;
        }

        pageEditButtons = <PageEditButtons key="pe1" editMode={this.state.editMode} addMode={this.state.addMode} />;

        return (
            <div className="row">
                {loader}

                <ReactCSSTransitionGroup transitionName="module">
                    {pageFilter}
                </ReactCSSTransitionGroup>

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