/**
 * @jsx React.DOM
 */

var React = require('react');
var PageActions = require('../actions/page.actions');

var PageEditButtons = React.createClass({
    _toggleEditMode: function () {
        PageActions.toggleEditMode();
    },
    _toggleAddMode: function () {
        PageActions.toggleAddMode();
    },
    render: function () {
        var cxe,
            cxeb = 'edit-buttons',
            cxa,
            style = {},
            disabled = '';

        if (this.props.editMode) {
            cxe = "btn btn-danger";
        } else {
            cxe = "btn btn-success";
        }

        if (this.props.addMode) {
            cxa = "btn btn-danger btn-add-active";
            disabled = 'disabled';
            cxeb = cxeb + ' is-active';
            style = {display: 'block'};
        } else {
            cxa = "btn btn-success";
        }
        return (
            <div className={cxeb}>
                <button onClick={this._toggleEditMode} className={cxe} style={style} disabled={disabled}><i className="fa fa-pencil"></i></button>
                <button onClick={this._toggleAddMode} className={cxa} style={style}><i className="fa fa-plus"></i></button>
            </div>
        );
    }
});

module.exports = PageEditButtons;