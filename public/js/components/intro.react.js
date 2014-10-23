/**
 * @jsx React.DOM
 */

var React = require('react');

var Intro = React.createClass({
    render: function () {
        return(
            <div className="intro">
                <h1>I am the Intro!</h1>
                <h2>Noch eine Komponente....</h2>
                <hr />
            </div>
        );
    }
});

module.exports = Intro;