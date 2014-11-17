/**
 * @jsx React.DOM
 */

var React = require('react'),
    _ = require('lodash'),
    PageFilterStore = require('../stores/page_filter.store.js');

function getPageFilterState () {
    return {
        modules: PageFilterStore.getModulesOnPage()
    };
}

var Page = React.createClass({
    getInitialState: function () {
        return null;
    },

    componentDidMount: function () {
        PageFilterStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        PageFilterStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(getPageFilterState());
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">Page Filter</div>
            </div>
        );
    }
});

module.exports = Page;