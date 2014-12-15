var React = require('react');

var Home = React.createClass({
    render: function () {
        return (
            <div className="home">
                <h1>Welcome!</h1>
                <p>This is the home page..</p>
            </div>
        );
    }
});

module.exports = Home;