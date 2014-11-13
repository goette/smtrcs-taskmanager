var KpiBasic = require('../modules/kpi_basic.module'),
    ChartBasic = require('../modules/chart_basic.module'),
    GridBasic = require('../modules/grid_basic.module');

var ModuleCollection = [
    {
        id: 'KpiConversionInsight',
        type: KpiBasic,
        roles: ['c','s','e'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-6 col-md-3 green'
    },
    {
        id: 'KpiSocial',
        type: KpiBasic,
        roles: ['c','s','e'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-6 col-md-3 steelblue'
    },
    {
        id: 'KpiTrafficInsight',
        type: KpiBasic,
        roles: ['c','s'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-12 orange'
    },
    {
        id: 'KpiUrlRankings',
        type: KpiBasic,
        roles: ['c'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-6 red'
    },
    {
        id: 'ChartChannelInsight',
        type: ChartBasic,
        roles: ['c', 's'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-12 lightgrey'
    },
    {
        id: 'GridUrlRankings',
        type: GridBasic,
        roles: ['c','s','e'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-12 blue'
    }
];

module.exports = ModuleCollection;