var React = require('react');

var Spinner = React.createClass({
    render: function () {
        return (
            <i className="spin extra-large"></i>
        );
    }
});

module.exports = Spinner;