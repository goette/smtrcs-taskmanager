var React = require('react');

var DropdownFilter = React.createClass({
    render: function () {
        return (
            <div>{this.props.filterParam}</div>
        );
    }
});

module.exports = DropdownFilter;