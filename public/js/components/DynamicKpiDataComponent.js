var React = require('react');

var DynamicKpiDataComponent = React.createClass({
    render: function () {
        return (
            <div className="module-content">
                <h4>Dynamic Data</h4>
                <p>Value: {this.props.data.value}</p>
                <p>Trend: {this.props.data.trend}</p>
            </div>
        );
    }
});

module.exports = DynamicKpiDataComponent;