var React = require('react'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin.js'),
    ModuleStore = require('../stores/ModuleStore'),
    ModuleActionCreators = require('../actions/ModuleActionCreators'),
    Headline = require('../components/HeadlineComponent.js'),
    RemoveButtonMixin = require('../mixins/RemoveButtonMixin'),
    _ = require('lodash');

var GridBasic = React.createClass({
    store: ModuleStore,

    mixins: [InitStoreInComponentMixin],

    componentDidMount: function () {
        ModuleActionCreators.fetchData(this.props.action, this.props.pageId);
    },

    getStateFromStore: function () {
        return {
            moduleData: this.store.getModuleData()
        };
    },

    render: function () {
        var remove = RemoveButtonMixin(this.props.editMode, this.props.pageId),
            roles = 'Roles: ' + this.props.roles.join(', '),
            cx = 'module grid ' + this.props.background;

        return (
            <div key={this.props.key} className={cx}>
                {remove}
                <Headline title={this.props.moduleId} />
                {roles}
            </div>
        );
    }
});

module.exports = GridBasic;