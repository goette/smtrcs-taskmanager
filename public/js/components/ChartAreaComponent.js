var React = require('react'),
    moment = require('moment');

require('../_helpers/highchartsTheme');

var ChartLine = React.createClass({
    displayName: 'AreaChart',

    _renderChart: function () {
        var node = document.getElementById(this.props.id),
            title = this.props.moduleData.moduleId,
            data = this.props.moduleData.data.response,
            series = [{
                name: 'Organic',
                data: this.props.moduleData.data.response.map(function (el) {
                    return el.organic;
                })
            }, {
                name: 'Paid',
                data: this.props.moduleData.data.response.map(function (el) {
                    return el.paid;
                })
            }, {
                name: 'Social',
                data: this.props.moduleData.data.response.map(function (el) {
                    return el.social;
                })
            }, {
                name: 'Direct',
                data: this.props.moduleData.data.response.map(function (el) {
                    return el.direct;
                })
            }, {
                name: 'Referring',
                data: this.props.moduleData.data.response.map(function (el) {
                    return el.referring;
                })
            }, {
                name: 'Other',
                data: this.props.moduleData.data.response.map(function (el) {
                    return el.other;
                })
            }],
            chartOptions = {
                chart: {
                    renderTo: node,
                    type: 'area',
                    zoomType: 'xy'
                },
                title: {
                    text: 'Channels Compared - historical'
                },
                xAxis: {
                    title: {
                        text: 'Time'
                    },
                    categories: this.props.moduleData.data.response.map(function (el) {
                        return moment(el.date, 'YYYYMMDD').format('MM/DD/YYYY');
                    })
                },
                yAxis: {
                    title: {
                        text: 'Counts'
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    pointFormat: '<b>{series.name}</b>: {point.y:,.0f}'
                },
                plotOptions: {
                    series: {
                        animation: false
                    },
                    line: {
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: series
            };

        this._chart = new Highcharts.Chart(chartOptions);
    },
    componentDidMount: function () {
        this._renderChart();
    },
    componentDidUpdate: function () {
        //this._renderChart();
    },
    componentWillUnmount: function () {
        console.log('destroy chart');
        this._chart.destroy();
    },
    render: function () {
        return (
            <div id={this.props.id} className="line-chart" />
        );
    }
});

module.exports = ChartLine;