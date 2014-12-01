var React = require('react');
var Header = require('./HeaderComponent.js');
var Page = require('../pages/DefaultPage.js');

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