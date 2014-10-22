/**
 * @jsx React.DOM
 */

var PageStore = require('../stores/PageStore');

var React = require('react');
var InheritsDomAttributes = require('../mixins/InheritsDomAttributes.mixin');
var Module = require('./module.react');
var Intro = require('./intro.react');
var Button = require('./button.react');

var _ = require('lodash');

function getPageState () {
    return {
        modules: PageStore.getModules()
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
                    pageId={node.pageId}
                    key={_.uniqueId()}
                />
            );
        });

        return(
            <div className="container">
                <Intro text={this.props.hallo} />
                {nodes}
                <Button />
            </div>
        );
    }
});

module.exports = Main;