/**
 * @jsx React.DOM
 */

var React = require('react');

var Module = React.createClass({
    _checkArticle: function () {
        return this.props.pageId === 'kpi' ? 'eine' : 'ein';
    },
    render: function () {
        return(
            <div className="module-item">
                <h3>Ich bin {this._checkArticle()} {this.props.name}</h3>
                <span>Ein Modul kann so komplex sein, wie es will..</span>
            </div>
        );
    }
});

module.exports = Module;