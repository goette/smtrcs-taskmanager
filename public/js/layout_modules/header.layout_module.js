/**
 * @jsx React.DOM
 */

var React = require('react');
var PageActions = require('../actions/page.actions');

var Header = React.createClass({
    _onChange: function (e) {
        PageActions.setCurrentRole(e.target.value);
    },
    render: function () {
        var options = ['C-Level','SEO','Editor'];
        var renderedOptions = options.map(function (option, i) {
             return(
                 <option key={'opt' + i} value={option}>{option}</option>
             );
        });

        return (
            <nav className="header navbar navbar-default navbar-fixed-top" role="navigation">
                <div className="container-fluid">
                    <a className="navbar-brand bars" href="/v1.html"><i className="fa fa-bars"></i></a>
                    <a className="navbar-brand pull-right" href="/v1.html">S7 v0.1.0</a>
                    <select onChange={this._onChange}>
                        {renderedOptions}
                    </select>
                </div>
            </nav>
        );
    }
});

module.exports = Header;