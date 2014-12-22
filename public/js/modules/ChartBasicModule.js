var React = require('react'),
    _ = require('lodash'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin.js'),
    ModuleStore = require('../stores/ModuleStore'),
    ModuleActionCreators = require('../actions/ModuleActionCreators'),
    Headline = require('../components/HeadlineComponent.js'),
    ChartLineComponent = require('../components/ChartLineComponent.js'),
    ChartAreaComponent = require('../components/ChartAreaComponent.js'),
    SwitchVisualizationButton = require('../components/SwitchVisualizationButtonComponent.js'),
    SpinnerModule = require('../components/SpinnerModuleComponent.js'),
    RemoveButtonMixin = require('../mixins/RemoveButtonMixin.js');

var ConversionInside = React.createClass({
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
            cx = 'module chart ' + this.props.background,
            chartComponent,
            moduleData;

        if (_.isEmpty(this.state.moduleData) ||
            _.isEmpty(this.state.moduleData[this.props.moduleIdOnPage])) {
            chartComponent = <SpinnerModule text="Loading..." />
        } else {
            moduleData = this.state.moduleData[this.props.moduleIdOnPage];
            switch (this.props.visualization) {
                case 'line':
                    chartComponent = <ChartLineComponent id={this.props.moduleIdOnPage} moduleData={moduleData} />
                    break;

                default:
                    chartComponent = <ChartAreaComponent id={this.props.moduleIdOnPage} moduleData={moduleData} />
            }
        }

        return (
            <div key={this.props.key} className={cx}>
                {remove}
                <Headline title={this.props.id} />
                <SwitchVisualizationButton visualizationTypes={this.props.visualizationTypes} currentVisualization={this.props.visualization} moduleId={this.props.moduleIdOnPage} />
                {chartComponent}
            </div>
        );
    }
});

module.exports = ConversionInside;