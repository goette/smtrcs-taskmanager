var React = require('react'),
    _ = require('lodash'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin'),
    FilterConfig = require('./_FilterConfig'),
    FilterComponents = require('./_AllFilterComponents'),
    PageFilterActions = require('../actions/PageFilterActionCreators'),
    PageFilterStore = require('../stores/PageFilterStore');

var PageFilter = React.createClass({
    store: PageFilterStore,

    mixins: [InitStoreInComponentMixin],

    getStateFromStore: function () {
        return {
            filterParamsOnPage: this.store.getFilterParamsOnPage(),
            filterDataOnPage: this.store.getFilterDataOnPage()
        };
    },

    render: function () {
        var filterComponents = this.state.filterParamsOnPage.map(function (filterParam, i) {
            var key = 'pageFilterItems' + i,
                type = FilterConfig[filterParam].type,
                action = FilterConfig[filterParam].action,
                FilterComponent = FilterComponents[type],
                data = this.state.filterDataOnPage[filterParam];

            return (
                <FilterComponent key={key} action={action} text={type} filterParam={filterParam} filterData={data} />
            );
        }, this);

        if (!this.state.filterParamsOnPage.length) {
            return null;
        }

        return (
            <div className="col-xs-12">
                <div className="page-filter">
                    <h4>Page filter</h4>
                    {filterComponents}
                    <button className="btn btn-success page-filter-submit">Submit</button>
                </div>
            </div>
        );
    }
});

module.exports = PageFilter;