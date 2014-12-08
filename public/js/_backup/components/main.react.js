/**
 * @jsx React.DOM
 */

var PageStore = require('../stores/PageStore');

var React = require('react');
var InheritsDomAttributes = require('../mixins/InheritsDomAttributes.mixin');
var CompModule = require('./module.react');
var CompIntro = require('./intro.react');
var CompButton = require('./button.react');

function getPageState () {
    return {
        modules: PageStore.getModulesOnPage()
    };
}

var Main = React.createClass({
    mixins: [InheritsDomAttributes],

    getInitialState: function () {
        return getPageState();
    },

    componentDidMount: function () {
        PageStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        PageStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(getPageState());
    },

    render: function () {
        var nodes = this.state.modules.map(function (node) {
            return (
                <CompModule
                    name={node.name}
                    type={node.type}
                    key={node.moduleId}
                />
            );
        });

        return(
            <div className="container">
                <CompIntro hi="mencshc" text={this.props.hallo} meineid={this.props.id} />
                <div className="col-sm-8">
                    {nodes}
                </div>
                <div className="col-sm-4">
                    <CompButton />
                </div>
            </div>
        );
    }
});

module.exports = Main;