var React = require('react'),
    _ = require('lodash'),
    PageActionCreators = require('../actions/PageActionCreators.js'),
    NavigationActionCreators = require('../actions/NavigationActionCreators.js');

var Header = React.createClass({
    _onChange: function (e) {
        PageActionCreators.setCurrentRole(e.target.value);
    },
    _toggleNav: function (e) {
        e.preventDefault();
        NavigationActionCreators.toggle();
    },
    render: function () {
        var options = ['C-Level','SEO','Editor'];
        var renderedOptions = _.map(options, function (option, i) {
             return(
                 <option key={'opt' + i} value={option}>{option}</option>
             );
        });

        return (
            <nav className="header navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <a className="navbar-brand bars" onClick={this._toggleNav} href="/"><i className="fa fa-bars"></i></a>
                    <img className="main-logo" src="/images/logo_suite.png" />
                    <a className="navbar-brand pull-right" href="/">S7 v0.1.0</a>
                    <select onChange={this._onChange}>
                        {renderedOptions}
                    </select>
                </div>
            </nav>
        );
    }
});

module.exports = Header;