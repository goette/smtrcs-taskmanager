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
        PageActions.toggleDisableScroll();
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
        } else {
            cxa = "btn btn-success";
        }
        return (
            <div className={cxeb}>
                <button onClick={this._toggleEditMode} className={cxe} disabled={disabled}><i className="fa fa-pencil"></i></button>
                <button onClick={this._toggleAddMode} className={cxa}><i className="fa fa-plus"></i></button>
            </div>
        );
    }
});

module.exports = PageEditButtons;