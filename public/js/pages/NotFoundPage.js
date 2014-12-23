var React = require('react');

var NotFound = React.createClass({
    render: function () {
        return (
            <div className="home">
                <h1>This page could not be found!</h1>
                <p>Go somewhere else..</p>
            </div>
        );
    }
});

module.exports = NotFound;