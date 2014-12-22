var React = require('react');

var ChartLine = React.createClass({
    render: function () {
        console.log(this.props.id, this.props.moduleData.data.response);
        return (
            <h1>Ich bin ein LineChart</h1>
        );
    }
});

module.exports = ChartLine;