var React = require('react'),
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

var Navigation = React.createClass({
    store: NavigationStore,

    mixins: [InitStoreInComponentMixin],

    getStateFromStore: function () {
        return {
            isOpen: this.store.getMenuIsOpen(),
            navigation: this.store.getNavigation()
        };
    },

    componentDidMount: function () {
        // Pretend to receive the navigation config
        ApiUtils.retrieveNavigationConfig();

        // We use jquery for now
        //prevent default clicking on direct children of .cd-primary-nav

        $('.cd-primary-nav').children('.has-children').children('a').on('click', function(event){
            event.preventDefault();
        });
        //open submenu
        $('.has-children').children('a').on('click', function(event){
            event.preventDefault();
            var selected = $(this);
            if( selected.next('ul').hasClass('is-hidden') ) {
                //desktop version only
                selected.addClass('selected').next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('moves-out');
                selected.parent('.has-children').siblings('.has-children').children('ul').addClass('is-hidden').end().children('a').removeClass('selected');
                $('.cd-overlay').addClass('is-visible');
            } else {
                selected.removeClass('selected').next('ul').addClass('is-hidden').end().parent('.has-children').parent('ul').removeClass('moves-out');
                $('.cd-overlay').removeClass('is-visible');
            }
        });
        //submenu items - go back link
        $('.go-back').on('click', function(event) {
            event.preventDefault();
            $(this).parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('moves-out');
        });
    },

    render: function () {
        var cxNav = "cd-primary-nav is-fixed",
            nodes;

        if (this.state.isOpen) {
            cxNav +=  " nav-is-visible";
        }

        nodes = this.state.navigation.map(function (node) {
            return <TreeNode key={node.path} node={node} parentName='Main Menu' />
        });

        return (
            <nav className="nav">
                <ul id="cd-primary-nav" className={cxNav}>
                    {nodes}
                </ul>
                <div className="dim-the-light" onClick={_forceCloseNav}></div>
            </nav>
        );

        /*return (
            <nav className="nav">
                <ul id="cd-primary-nav" className={cxNav}>
                    <li><Link onClick={this._handleRouting} to="home">Home</Link></li>
                    <li className="has-children">
                        <a>Rankings</a>
                        <ul className="cd-secondary-nav is-hidden">
                            <li className="go-back"><a>Main Menu</a></li>
                            <li><Link onClick={this._handleRouting} to="page" params={{pageId: "rankings-overview"}}>Overview</Link></li>
                            <li className="has-children">
                                <a>Organic Rankings</a>

                                <ul className="is-hidden">
                                    <li className="go-back">
                                        <a>Rankings</a>
                                    </li>
                                    <li>
                                        <a>URL Rankings</a>
                                    </li>
                                    <li>
                                        <a>Keyword Rankings</a>
                                    </li>
                                    <li>
                                        <a>Ranking Analysis</a>
                                    </li>
                                    <li>
                                        <a>Position Spread</a>
                                    </li>
                                    <li>
                                        <a>Keyword Potential</a>
                                    </li>
                                    <li>
                                        <a>Tag Potential</a>
                                    </li>
                                </ul>
                            </li>
                            <li><a>Market Insights</a></li>
                            <li><a>Paid Rankings</a></li>
                        </ul>
                    </li>
                    <li>
                        <Link onClick={this._handleRouting} to="page" params={{pageId: "links"}}>Links</Link>
                    </li>
                    <li>
                        <a>Optimization</a>
                    </li>
                    <li>
                        <a>Traffic</a>
                    </li>
                </ul>
                <div className="dim-the-light" onClick={this._toggleNav}></div>
            </nav>
        );*/
    }
});

var TreeNode = React.createClass({
    render: function () {
        var childNodes,
            className = '';

        if (this.props.node.children) {
            childNodes = this.props.node.children.map(function(node, index) {
                return (
                    <TreeNode key={node.path} node={node} parentName={this.props.node.name} />
                );
            }, this);
            className = 'has-children';
        }

        return (
            <li className={className}>
                <a>{this.props.node.name}</a>
                <ul className="cd-secondary-nav is-hidden">
                    <li className="go-back"><a>{this.props.parentName}</a></li>
                    {childNodes}
                </ul>
            </li>
        );
    }
});

module.exports = Navigation;