/**
 * @jsx React.DOM
 */

var React = require('react');
var PageActions = require('../actions/PageActions');

var Module = React.createClass({
    _checkArticle: function () {
        return this.props.type === 'kpi' ? 'eine' : 'ein';
    },
	_onDeleteClick: function () {
		PageActions.removeModule(this.props.key);
    },		
			
    render: function () {
        return(
            <div className="module-item">
                <h3>Ich bin {this._checkArticle()} {this.props.name} <button className="btn btn-danger" onClick={this._onDeleteClick}>delete me!</button></h3>
                <span>Ein Modul kann so komplex sein, wie es will..</span>
            </div>
        );
    }
});

module.exports = Module;