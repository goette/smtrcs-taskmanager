var React = require('react'),
    _ = require('lodash'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin'),
    FilterComponents = require('./_AllFilterComponents'),
    PageFilterActions = require('../actions/PageFilterActionCreators.js'),
    PageFilterStore = require('../stores/PageFilterStore.js');

function getPageFilterState () {
    return {
        filterParamsOnPage: PageFilterStore.getFilterParamsOnPage()
    };
}

var PageFilter = React.createClass({
    store: PageFilterStore,

    mixins: [InitStoreInComponentMixin],

    getStateFromStore: function () {
        return {
            filterParamsOnPage: this.store.getFilterParamsOnPage()
        };
    },

    render: function () {
        var nodes = this.state.filterParamsOnPage.map(function (el, i) {
            var key = 'pageFilterItems' + i;
                //FilterComponent = FilterComponents[];
            return (
                <div key={key}>{el}</div>
            );
        });
        return (
            <div className="col-xs-12 page-filter">{nodes}</div>
        );
    }
});

module.exports = PageFilter;