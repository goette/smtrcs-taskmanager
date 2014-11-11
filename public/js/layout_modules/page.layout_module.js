/**
 * @jsx React.DOM
 */

var React = require('react');
var PageActions = require('../actions/page.actions');
var PageStore = require('../stores/page.store');

function getPageState () {
    return {
        modules: PageStore.getModulesOnPage()
    };
}

var Page = React.createClass({
    getInitialState: function () {
        return null;
    },

    componentDidMount: function () {
        PageStore.addChangeListener(this._onChange);
        PageActions.initialize();
    },

    componentWillUnmount: function () {
        PageStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(getPageState());
    },

    render: function () {
        var modules;

        if (this.state) {
            modules = this.state.modules.map(function (module) {
                return (
                    <module.type
                        title={module.id}
                        cx={module.className}
                        action={module.action}
                        pageId={module.pageId}
                    />
                );
            });
        } else {
            modules = '';
        }


        return (
            <div className="row">
                {modules}
            </div>
        );
    }
});

module.exports = Page;