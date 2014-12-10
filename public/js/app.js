var React = require('react'),
    AppExampleData = require('./AppExampleData'),
    ApiUtils = require('./utils/ApiUtils');
    Header = require('./components/HeaderComponent'),
    Page = require('./pages/DefaultPage'),
    Home = require('./pages/HomePage'),
    Navigation = require('./components/NavigationComponent'),
    NavigationActionCreators = require('./actions/NavigationActionCreators'),
    Router = require('react-router'),
    Route = Router.Route,
    Redirect = Router.Redirect,
    NotFoundRoute = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link,
    RouteHandler = Router.RouteHandler;

// For React DevTools
window.React = React;

AppExampleData.init(); // Write static data to localStorage

//ApiUtils.retrievePageConfig('page1');

var App = React.createClass({
    render: function () {
        return (
            <div className="container-fluid">
                <Header />
                <RouteHandler params={this.props.params} />
                <Navigation />
            </div>
        );
    }
});

var routes = (
    <Route handler={App}>
        <Route name="page" path="/page/:pageId" handler={Page} />
        <Route name="home" path="/home" handler={Home}/>
        <Redirect from="/" to="/home" />
    </Route>
);

Router.run(routes,  function (Handler, state) {
    var params = state.params;
    React.render(<Handler params={params} />, document.getElementById('app'));
});