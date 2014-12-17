var React = require('react/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    _ = require('lodash'),
    Header = require('./HeaderComponent'),
    Page = require('../pages/DefaultPage'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin'),
    NavigationStore = require('../stores/NavigationStore'),
    NavigationActionCreators = require('../actions/NavigationActionCreators'),
    ApiUtils = require('../utils/ApiUtils'),
    PageActionCreators = require('../actions/PageActionCreators'),
    $ = require('jquery'),
    Router = require('react-router'),
    Link = Router.Link;

function _forceCloseNav () {
    setTimeout(function () {
        NavigationActionCreators.toggle(true);
    }, 500);
}

function _toggleNav () {
    NavigationActionCreators.toggle();
}

var Navigation = React.createClass({
    store: NavigationStore,

    mixins: [InitStoreInComponentMixin],

    getStateFromStore: function () {
        return {
            isOpen: this.store.getMenuIsOpen(),
            navigation: this.store.getNavigation(),
            parentId: this.store.getParentId()
        };
    },

    componentDidMount: function () {
        // Pretend to receive the navigation config
        NavigationActionCreators.setInitialPath(this.props.currentPath);
        ApiUtils.retrieveNavigationConfig();
    },

    render: function () {
        var cxNav = "cd-primary-nav is-fixed",
            currentName = _.where(this.state.navigation, {id: this.state.parentId.current}),
            goBackEl = null,
            transitionName = 'menu-slide-left',
            enableTransition = true,
            nodes;

        if (this.state.isOpen) {
            cxNav +=  " nav-is-visible";
        }

        if (this.state.parentId.current && currentName.length) {
            goBackEl = <GoBackEl key={currentName[0]['path']} name={currentName[0]['name']} parentId={currentName[0]['parentId']} />;
        }

        if (this.state.parentId.current <= this.state.parentId.old) {
            transitionName = 'menu-slide-right';
        }

        console.log(this.state.parentId.old);

        if (this.state.parentId.old === null) {
            enableTransition = false;
        }

        nodes = _.where(this.state.navigation, {parentId: this.state.parentId.current}).map(function (node, index) {
            if (goBackEl) index += 1;
            return <TreeNode index={index} key={node.path} node={node} parentName='Main Menu' id={node.id} parentId={node.parentId} />
        });


        return (
            <nav className="nav">
                <ul className={cxNav} id={'nav' + this.state.parentId.current}>
                    <ReactCSSTransitionGroup transitionName={transitionName} transitionEnter={enableTransition}>
                        {goBackEl}
                        {nodes}
                    </ReactCSSTransitionGroup>
                </ul>
                <div className="dim-the-light" onClick={_toggleNav}></div>
            </nav>
        );
    }
});

var TreeNode = React.createClass({
    _setParentId: function () {
        NavigationActionCreators.setParentId(this.props.id);
    },

    render: function () {
        var className = '',
            childNodes,
            linkEl,
            to,
            pageId,
            style;

        if (this.props.node.children) {
            className = 'has-children';
            linkEl = <a onClick={this._setParentId}>{this.props.node.name}</a>;
        } else {
            to = this.props.node.path.split('/')[0];
            pageId = this.props.node.path.split('/')[1];
            linkEl = <Link onClick={_forceCloseNav} to={to} params={{pageId: pageId}}>{this.props.node.name}</Link>;
        }

        style = {
            top: this.props.index * 50
        };

        return (
            <li style={style} className={className}>
                {linkEl}
            </li>
        );
    }
});

var GoBackEl = React.createClass({
    _setParentId: function () {
        NavigationActionCreators.setParentId(this.props.parentId);
    },

    render: function () {
        return (
            <li className="go-back" onClick={this._setParentId}><a>{this.props.name}</a></li>
        );
    }
});

module.exports = Navigation;