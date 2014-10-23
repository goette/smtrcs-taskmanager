jest.dontMock('../../constants/PageConstants');
jest.dontMock('../PageStore');
jest.dontMock('react/lib/merge');

describe('PageStoreTest', function() {
    var PageConstants = require('../../constants/PageConstants');

    // mock actions inside dispatch payloads
    var actionModuleAdd = {
        source: 'VIEW_ACTION',
        action: {
            actionType: PageConstants.MODULE_ADD
        }
    };

    var actionModuleRemove = {
        source: 'VIEW_ACTION',
        action: {
            actionType: PageConstants.MODULE_REMOVE,
			moduleId: 'blurks'
        }
    };

    var AppDispatcher;
    var PageStore;
    var callback;

    beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        PageStore = require('../PageStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('should register a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('has a collection of 3 different modules', function() {
        var all = PageStore.getModuleCollection();
        expect(all.length).toEqual(3);
    });

    it('initialize without any module', function() {
        var onPage = PageStore.getModulesOnPage();
        expect(onPage.length).toEqual(0);
    });

    it('adds a module to the page', function () {
        callback(actionModuleAdd);
        var onPage = PageStore.getModulesOnPage();
        expect(onPage.length).toEqual(1);
    });

    it('removes a module from the page', function () {
        var onPage,
            keys;

        // Add one module
        callback(actionModuleAdd);

        // Check that PageStore modules on page has 1 entry
        onPage = PageStore.getModulesOnPage();
        expect(onPage.length).toBe(1);

        // Set the moduleId in remove action to moduleId of the first (and only) entry
        // And trigger the "remove" action
		actionModuleRemove.action.moduleId = onPage[0].moduleId;
        callback(actionModuleRemove);

        // Yes it should be empty
        onPage = PageStore.getModulesOnPage();
        expect(onPage.length).toEqual(0);
    });
});