jest.dontMock('../../constants/page.constants');
jest.dontMock('../page.store');
jest.dontMock('react/lib/merge');
jest.dontMock('../../_config/module_collection');
jest.dontMock('../../_config/static_page');

describe('PageStoreTest', function() {
    var PageConstants = require('../../constants/page.constants'),
        ModuleCollection = [
            {
                id: 'TestModule1',
                roles: ['c','s','e']
            },
            {
                id: 'TestModule2',
                roles: ['c']
            }
        ];

    // mock actions inside dispatch payload
    var initialize = {
        source: 'VIEW_ACTION',
        action: {
            actionType: PageConstants.PAGE_INITIALIZE,
            moduleCollection: ModuleCollection,
            initiallyOnPage: []
        }
    };

    var actionModuleAdd = {
        source: 'VIEW_ACTION',
        action: {
            actionType: PageConstants.MODULE_ADD,
            moduleId: 'TestModule1'
        }
    };

    var actionModuleRemove = {
        source: 'VIEW_ACTION',
        action: {
            actionType: PageConstants.MODULE_REMOVE,
			moduleId: 'this will be set by test'
        }
    };

    var actionToggleEdit = {
        source: 'VIEW_ACTION',
        action: {
            actionType: PageConstants.PAGE_TOGGLE_EDIT
        }
    };

    var actionToggleAdd = {
        source: 'VIEW_ACTION',
        action: {
            actionType: PageConstants.PAGE_TOGGLE_ADD
        }
    };

    var actionFilterByRole = {
        source: 'VIEW_ACTION',
        action: {
            actionType: PageConstants.MODULE_FILTER_BY_ROLE,
            role: 's'
        }
    };

    var AppDispatcher,
        PageStore,
        callback;

    beforeEach(function() {
        AppDispatcher = require('../../_dispatcher/app.dispatcher');
        PageStore = require('../page.store');
        callback = AppDispatcher.register.mock.calls[0][0];

        callback(initialize);

    });

    it('should register a callback with the dispatcher', function() {
        // This makes sure the page store is registered with the dispatcher first
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('merges the initial modules correctly', function () {
        // Pretend there is a module in the page config
        initialize.action.initiallyOnPage = [{id: 'TestModule2'}];
        // And Initialize store again
        callback(initialize);
        // There should be 1 module on page
        expect(PageStore.getModulesOnPage().length).toBe(1);
        // The module should have a property 'roles'
        expect(PageStore.getModulesOnPage()[0]['roles']).not.toBeUndefined();
        // Reset initial page config for next tests
        initialize.action.initiallyOnPage.length = 0;
    });

    it('adds a module to the page', function () {
        // Add one module
        callback(actionModuleAdd);
        // We have one module on the page
        expect(PageStore.getModulesOnPage().length).toEqual(1);
    });

    it('removes a module from the page', function () {
        // Add one module
        callback(actionModuleAdd);
        // Set moduleId in remove action to pageId of the first (and only) entry
        // and trigger the "remove" action
		actionModuleRemove.action.moduleId = PageStore.getModulesOnPage()[0].pageId;
        callback(actionModuleRemove);
        // The module should be removed, which means there is 0 modules on page again
        expect(PageStore.getModulesOnPage().length).toEqual(0);
    });

    it('toggles edit-mode', function () {
        // Get edit initial edit mode (true / false)
        var editMode = PageStore.getEditMode();
        // Toggle it
        callback(actionToggleEdit);
        // It should be the opposite now
        expect(PageStore.getEditMode()).toBe(!editMode);
    });

    it('toggles add-mode', function () {
        // Get edit initial add mode (true / false)
        var addMode = PageStore.getAddMode();
        // Toggle it
        callback(actionToggleAdd);
        // It should be the opposite now
        expect(PageStore.getAddMode()).toBe(!addMode);
    });

    it('filters modules on page by role', function () {
        // Add first test element
        callback(actionModuleAdd);
        // Add second test element
        actionModuleAdd.action.moduleId = 'TestModule2';
        callback(actionModuleAdd);
        // Are there 2 elements on the page? (yes!)
        expect(PageStore.getModulesOnPage().length).toEqual(2);
        // Change Role to 's'
        callback(actionFilterByRole);
        // One element should be removed by filter
        expect(PageStore.getModulesOnPage().length).toEqual(1);
    });
});