var React = require('react');
var PageActions = require('../actions/PageActionCreators.js');

var removeModule = React.createClass({
    _deleteMe: function () {
        console.log(this.props.moduleIdOnPage);
        PageActions.removeModule(this.props.moduleIdOnPage);
    },
    render: function () {
        return (
            <button onClick={this._deleteMe} className="btn-delete btn btn-default">{'\u2a09'}</button>
        );
    }
});

module.exports = removeModule;