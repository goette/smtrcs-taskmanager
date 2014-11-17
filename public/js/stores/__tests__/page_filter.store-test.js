jest.dontMock('../../constants/page_filter.constants');
jest.dontMock('../page_filter.store');
jest.dontMock('react/lib/merge');

describe('PageFilterStoreTest', function() {
    var PageFilterConstants = require('../../constants/page_filter.constants');

    // mock actions inside dispatch payload
    var initialize = {
        source: 'VIEW_ACTION',
        action: {
            actionType: PageFilterConstants.PAGE_FILTER_INITIALIZE
        }
    };

    var AppDispatcher,
        PageFilterStore,
        callback;

    beforeEach(function() {
        AppDispatcher = require('../../_dispatcher/app.dispatcher');
        PageFilterStore = require('../page_filter.store');
        callback = AppDispatcher.register.mock.calls[0][0];

        callback(initialize);
    });

    it('should register a callback with the dispatcher', function() {
        // This makes sure the page store is registered with the dispatcher
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('detects the available filter params correctly', function () {
        var PageStore = require('../page.store');
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
        // There should be 3 available filter params
        expect(PageFilterStore.getFilterParamsOnPage().length).toBe(3);
        expect(PageFilterStore.getFilterParamsOnPage()[2]).toBe('tags');
    });
});