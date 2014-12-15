var React = require('react'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin'),
    _ = require('lodash'),
    AllModules = require('../modules/_AllModules'),
    PageActionCreators = require('../actions/PageActionCreators'),
    PageStore = require('../stores/PageStore'),
    AddMenu = require('./../components/AddMenuComponent'),
    PageEditButtons = require('./../components/PageEditButtonsComponent'),
    Loader = require('./../components/SpinnerComponent'),
    PageFilter = require('../filter/PageFilter'),
    //ApiUtils = require('../utils/ApiUtils'),
    Router = require('react-router');

var Page = React.createClass({
    store: PageStore,

    mixins: [Router.State, InitStoreInComponentMixin],

    getStateFromStore: function () {
        return {
            modules: this.store.getModulesOnPage(),
            moduleCollection: this.store.getModuleCollection(),
            pageFilter: this.store.getPageFilter(),
            editMode: this.store.getEditMode(),
            addMode: this.store.getAddMode()
        };
    },

    componentWillMount: function () {
        //ApiUtils.retrievePageConfig(this.props.params.pageId);
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.props.params.pageId !== nextProps.params.pageId) {
            PageActionCreators.clearPage();
            //ApiUtils.retrievePageConfig(nextProps.params.pageId);
        };
    },

    componentWillUnmount: function () {
        PageActionCreators.clearPage();
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
                var ModuleComponent = AllModules[module.type];

                return (
                    <div className={module.className}
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
                {pageFilter}
                {modules}
                {addMenu}
                {pageEditButtons}
            </div>
        );
    }
});

module.exports = Page;