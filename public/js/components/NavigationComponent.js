var React = require('react'),
    _ = require('lodash'),
    Header = require('./HeaderComponent'),
    Page = require('../pages/DefaultPage'),
    InitStoreInComponentMixin = require('../mixins/InitStoreInComponentMixin'),
    NavigationStore = require('../stores/NavigationStore'),
    NavigationActionCreators = require('../actions/NavigationActionCreators'),
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
            navigation = this.state.navigation,
            root = {id:0, parentId: null, children: []},
            node_list = { 0 : root},
            nodes,
            nodes1,
            nodes2;

        if (this.state.isOpen) {
            cxNav +=  " nav-is-visible";
        }

        _.each(navigation, function (el, i) {
            node_list[el.id] = el;
            node_list[el.parentId].children.push(node_list[el.id]);
        });

        console.log(root.children)

        nodes = _.map(root.children, function (item, key) {
            if (item.children.length) {
                nodes1 = _.map(item.children, function (item1, key1) {
                    if (item1.children.length) {

                    } else {
                        return (
                            <li key={key1}><Link onClick={_forceCloseNav} to="page" params={{pageId: item1.path.split('/')[1]}}>{item1.name}</Link></li>
                        );
                    }

                });
                console.log(key, item,name, nodes1);
                return (
                    <li key={key} className="has-children">
                        <a>{item.name}</a>
                        <ul className="cd-secondary-nav is-hidden">
                            <li className="go-back"><a>Main Menu</a></li>
                            {nodes1}
                        </ul>
                    </li>
                );
            } else {
                nodes1 = null;
                return (
                    <li key={key}><Link onClick={_forceCloseNav} to="page" params={{pageId: item.path.split('/')[1]}}>{item.name}</Link></li>
                );
            }
        }, this);

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

module.exports = Navigation;