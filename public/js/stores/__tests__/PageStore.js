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

    var AppDispatcher;
    var PageStore;
    var callback;

    /*beforeEach(function() {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        PageStore = require('../PageStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('should register a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });*/

    /*it('is defined', function() {
        var _ = require('lodash');
        var AppDispatcher = require('../dispatcher/AppDispatcher');
        var EventEmitter = require('events').EventEmitter;
        var PageConstants = require('../constants/PageConstants');
        var merge = require('react/lib/merge');
        var CHANGE_EVENT = 'change';
        var PageStore = require('../stores/PageStore');
    });*/
});