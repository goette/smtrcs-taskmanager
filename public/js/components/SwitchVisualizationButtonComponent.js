var React = require('react'),
    _ = require('lodash'),
    PageActionCreators = require('../actions/PageActionCreators.js');

var SwitchVisualizationButtons = React.createClass({
    render: function () {
        if (this.props.visualizationTypes.length > 1) {
            var buttons = _.map(this.props.visualizationTypes, function (el, i) {
                var key = 'visualization-' + i,
                    cx = 'fa fa-' + el + '-chart';
                return <SwitchVisualizationButton {...this.props} visualization={el} cx={cx} key={key} />;
            }, this);

            return (
                <div className="btn-group switch-visualization" role="group">
                    {buttons}
                </div>
            );
        } else {
            return null;
        }
    }
});

var SwitchVisualizationButton = React.createClass({
    _switchVisualization: function (a, b) {
        PageActionCreators.switchModuleVisualization(this.props.moduleId, this.props.visualization);
    },
    render: function () {
        var cx = "btn btn-default";
        if (this.props.currentVisualization === this.props.visualization) {
            cx += " active";
        }
        return (
            <button onClick={this._switchVisualization} key={this.props.key} type="button" className={cx}><i className={this.props.cx}></i></button>
        )
    }
});

module.exports = SwitchVisualizationButtons;