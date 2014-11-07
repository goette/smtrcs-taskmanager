/**
 * @jsx React.DOM
 */

var React = require('react');

var PageStore = require('../stores/page.store');

function getPageState () {
    return {
        modules: PageStore.getModulesOnPage().modulesOnPage
    };
}

var Page = React.createClass({
    getInitialState: function () {
        console.log(getPageState());
        return getPageState();
    },

    componentDidMount: function () {
        PageStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        PageStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(getPageState());
    },

    render: function () {
        var modules = this.state.modules.map(function (node) {
            return (
                <node.type />
            );
        });

        return (
            <div className="row">
                {modules}
            </div>
        );
    }
});

module.exports = Page;