var React = require('react'),
    AppExampleData = require('./AppExampleData'),
    TaskManager = require('./components/TaskManagerComponent'),
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

var App = React.createClass({
    render: function () {
        return (
            <div className="container">
                <RouteHandler params={this.props.params} />
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
    React.render(<Handler currentPath={currentPath} params={params} />, document.getElementById('app'));
});