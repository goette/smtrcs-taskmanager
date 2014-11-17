var React = require('react');

var Headline = React.createClass({
    render: function () {
        return (
            <strong>{this.props.title}</strong>
        );
    }
});

module.exports = Headline;