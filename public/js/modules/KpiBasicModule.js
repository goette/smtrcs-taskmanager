var React = require('react'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin.js'),
    ModuleStore = require('../stores/ModuleStore'),
    ModuleActionCreators = require('../actions/ModuleActionCreators'),
    Headline = require('../components/HeadlineComponent.js'),
    SpinnerModule = require('../components/SpinnerModuleComponent.js'),
    DynamicKpiDataComponent = require('../components/DynamicKpiDataComponent.js'),
    RemoveButtonMixin = require('../mixins/RemoveButtonMixin.js'),
    _ = require('lodash');

var KpiBasic = React.createClass({
    store: ModuleStore,

    mixins: [InitStoreInComponentMixin],

    componentDidMount: function () {
        ModuleActionCreators.fetchData(this.props.action, this.props.moduleIdOnPage);
    },

    getStateFromStore: function () {
        return {
            moduleData: this.store.getModuleData()
        };
    },

    render: function () {
        var remove = RemoveButtonMixin(this.props.editMode, this.props.moduleIdOnPage),
            roles = 'Roles: ' + this.props.roles.join(', '),
            cx = 'kpi module ' + this.props.background,
            dynamicNodes;

        if (_.isEmpty(this.state.moduleData) ||
            _.isEmpty(this.state.moduleData[this.props.moduleIdOnPage])) {
            dynamicNodes = <SpinnerModule text="Loading..." />
        } else {
            dynamicNodes = <DynamicKpiDataComponent data={this.state.moduleData[this.props.moduleIdOnPage].data} />
        }

        return (
            <div key={this.props.key} className={cx}>
                {remove}
                <Headline title={this.props.id} />
                <p>{roles}</p>
                {dynamicNodes}
            </div>
        );
    }
});

module.exports = KpiBasic;