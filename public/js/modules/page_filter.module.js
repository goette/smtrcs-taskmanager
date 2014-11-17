/**
 * @jsx React.DOM
 */

var React = require('react'),
    _ = require('lodash'),
    PageFilterActions = require('../actions/page_filter.actions'),
    PageFilterStore = require('../stores/page_filter.store.js');

function getPageFilterState () {
    return {
        filterParamsOnPage: PageFilterStore.getFilterParamsOnPage()
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
            <div className="col-xs-12 page-filter">Page Filter</div>
        );
    }
});

module.exports = Page;