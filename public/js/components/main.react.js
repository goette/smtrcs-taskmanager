/**
 * @jsx React.DOM
 */

var PageStore = require('../stores/PageStore');

var React = require('react');
var InheritsDomAttributes = require('../mixins/InheritsDomAttributes.mixin');
var Module = require('./module.react');
var Intro = require('./intro.react');
var Button = require('./button.react');

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
                <Module
                    name={node.name}
                    type={node.type}
                    key={node.moduleId}
                />
            );
        });

        return(
            <div className="container">
                <Intro text={this.props.hallo} />
                <div className="col-sm-8">
                    {nodes}
                </div>
                <div className="col-sm-4">
                    <Button />
                </div>
            </div>
        );
    }
});

module.exports = Main;