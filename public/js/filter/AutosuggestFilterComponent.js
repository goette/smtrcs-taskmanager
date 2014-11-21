var React = require('react');

var AutosuggestFilter = React.createClass({
    render: function () {
        return (
            <div>{this.props.filterParam}</div>
        );
    }
});

module.exports = AutosuggestFilter;