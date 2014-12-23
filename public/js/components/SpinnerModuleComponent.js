var React = require('react');

var Spinner = React.createClass({
    render: function () {
        return (
            <div className="spin-mini-container">
                {this.props.text} <i className="spin small"></i>
            </div>
        );
    }
});

module.exports = Spinner;