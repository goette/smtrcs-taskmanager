var React = require('react'),
    _ = require('lodash'),
    SpinnerModule = require('../components/SpinnerModuleComponent.js');

var DropdownFilter = React.createClass({
    render: function () {
        var renderedOptions,
            nodes,
            optionsArray;

        if (this.props.filterData) {
            renderedOptions = _.map(this.props.filterData, function (option, i) {
                return (
                    <option key={'opt' + i} value={option}>{option}</option>
                );
            });
            nodes = <select>{renderedOptions}</select>
        } else {
            nodes = <SpinnerModule />;
        }

        return (
            <div className="page-filter-dropdown">
                {nodes}
            </div>
        );
    }
});

module.exports = DropdownFilter;