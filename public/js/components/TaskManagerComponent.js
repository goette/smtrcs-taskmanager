var React = require('react'),
    _ = require('lodash'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin'),
    Header = require('./HeaderComponent'),
    Input = require('./InputComponent'),
    TaskManagerStore = require('../stores/TaskManagerStore.js'),
    TaskManagerActionCreators = require('../actions/TaskManagerActionCreators.js');

var TaskManager = React.createClass({
    store: TaskManagerStore,

    mixins: [InitStoreInComponentMixin],

    getStateFromStore: function () {
        return {
            showInput: this.store.getShowInput()
        };
    },

    render: function () {
        var inputField = null;

        if (this.state.showInput) {
            inputField = <Input />
        }

        return (
            <div className="taskmanager row">
                <Header showInput={this.state.showInput} />
                {inputField}
            </div>
        );
    }
});

module.exports = TaskManager;