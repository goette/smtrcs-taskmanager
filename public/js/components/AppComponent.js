var React = require('react'),
    Header = require('./HeaderComponent.js'),
    Page = require('./PageComponent.js');

var App = React.createClass({
    render: function () {
        return (
            <div className="container-fluid">
                <Header />
                <Page />
            </div>
        );
    }
});

module.exports = App;