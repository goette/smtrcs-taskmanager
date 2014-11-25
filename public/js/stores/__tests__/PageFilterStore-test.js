jest.dontMock('lodash');
jest.dontMock('../../constants/PageFilterConstants');
jest.dontMock('../PageFilterStore');
jest.dontMock('react/lib/merge');

describe('PageFilterStoreTest', function() {
    var PageFilterConstants = require('../../constants/PageFilterConstants');

    // mock actions inside dispatch payload
    /*var initialize = {
        source: 'VIEW_ACTION',
        action: {
            actionType: PageFilterConstants.PAGE_FILTER_INITIALIZE
        }
    };

    var AppDispatcher,
        PageFilterStore,
        callback;

    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        PageFilterStore = require('../PageFilterStore');
        callback = AppDispatcher.register.mock.calls[0][0];

        callback(initialize);
    });

    it('should register a callback with the dispatcher', function() {
        // This makes sure the page store is registered with the dispatcher
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('detects the available filter params correctly', function () {
        var PageStore = require('../PageStore.js');
        PageStore.getModulesOnPage.mockReturnValue(
            [{
                id: 'TestModule1',
                filterParams: [
                    'searchEngines',
                    'benchmarks',
                    'tags'
                ]
            },
            {
                id: 'TestModule2',
                filterParams: [
                    'searchEngines'
                ]
            }]
        );
        PageStore.getPageFilter.mockReturnValue(['searchEngines']);
        // There should be 3 available filter params
        console.log(PageFilterStore.getFilterParamsOnPage());
        expect(PageFilterStore.getFilterParamsOnPage().length).toBe(2);
        expect(PageFilterStore.getFilterParamsOnPage()[2]).toBe('tags');
    });*/
});