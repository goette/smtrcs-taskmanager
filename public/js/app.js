var React = require('react'),
    AppExampleData = require('./AppExampleData'),
    ApiUtils = require('./utils/ApiUtils');
    Header = require('./components/HeaderComponent'),
    Page = require('./pages/DefaultPage'),
    NotFound = require('./pages/NotFoundPage'),
    Home = require('./pages/HomePage'),
    Navigation = require('./components/NavigationComponent'),
    NavigationActionCreators = require('./actions/NavigationActionCreators'),
    Router = require('react-router'),
    Route = Router.Route,
    Redirect = Router.Redirect,
    NotFoundRoute = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,
    Link = Router.Link,
    RouteHandler = Router.RouteHandler,
    pathName = window.location.pathname;

// For React DevTools
window.React = React;

AppExampleData.init(); // Write static data to localStorage

var App = React.createClass({
    render: function () {
        return (
            <div className="container-fluid">
                <Header />
                <RouteHandler params={this.props.params} />
                <Navigation currentPath={this.props.currentPath} />
            </div>
        );
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Home} />
        <Route name="home" path="/home" handler={Home} />
        <Route name="page" path="/page/:pageId" handler={Page}>
            <DefaultRoute handler={Home}/>
            <NotFoundRoute handler={NotFound}/>
        </Route>
        <NotFoundRoute handler={NotFound} />
    </Route>
);

Router.run(routes, function (Handler, state) {
    var params = state.params,
        currentPath = state.path;
    console.log(params);
    React.render(<Handler currentPath={currentPath} params={params} />, document.getElementById('app'));
});