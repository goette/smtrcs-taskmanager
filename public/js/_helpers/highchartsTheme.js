// Load the fonts
Highcharts.createElement('link', {
    href: 'http://fonts.googleapis.com/css?family=Signika:400,700',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

// Add the background image to the container
Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
    proceed.call(this);
    this.container.style.background = '#fff';
});

Highcharts.theme = {
    colors: ["#ffff00", "#5cb85c", "#8d4654", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
        backgroundColor: null,
        resetZoomButton: {
            theme: {
                fill: 'white',
                stroke: 'silver',
                r: 0,
                states: {
                    hover: {
                        fill: '#41739D',
                        style: {
                            color: 'white'
                        }
                    }
                }
            }
        }
    },
    title: {
        style: {
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold'
        }
    },
    tooltip: {
        borderWidth: 0
    },
    legend: {
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },
    xAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    yAxis: {
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    plotOptions: {
        series: {
            shadow: true
        },
        candlestick: {
            lineColor: '#404048'
        },
        map: {
            shadow: false
        }
    },

    // Highstock specific
    navigator: {
        xAxis: {
            gridLineColor: '#D0D0D8'
        }
    },

    scrollbar: {
        trackBorderColor: '#C0C0C8'
    },

    credits: {
        enabled: false
    },

    lang: {
        resetZoom: 'Reset zoom'
    },

    // General
    background2: '#E0E0E8'
};

Highcharts.setOptions(Highcharts.theme);
