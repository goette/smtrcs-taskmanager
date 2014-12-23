var React = require('react'),
    SpinnerModule = require('../components/SpinnerModuleComponent.js');

var AutosuggestFilter = React.createClass({
    render: function () {
        var nodes;

        if (this.props.filterData) {
            nodes = <input type="text" name="fuzzysearch" placeholder="Start typing..." />
        } else {
            nodes = <SpinnerModule />
        }

        return (
            <div className="page-filter-autosuggest">
                {nodes}
            </div>
        );
    }
});

module.exports = AutosuggestFilter;