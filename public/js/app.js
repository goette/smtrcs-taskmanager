var React = require('react'),
    App = require('./components/AppComponent'),
    AppExampleData = require('./AppExampleData'),
    ApiUtils = require('./utils/ApiUtils');

// For React DevTools
window.React = React;

AppExampleData.init(); // Write static data to localStorage

ApiUtils.getPageConfig();

React.render(
    <App />,
    document.getElementById('app')
);
