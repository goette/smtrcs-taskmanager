var KpiBasic = require('../modules/kpi_basic.module');
var ChartBasic = require('../modules/chart_basic.module');

var ModuleCollection = [
    {
        id: 'KpiConversionInsight',
        type: KpiBasic,
        roles: ['c','s','e'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-6 col-md-3'
    },
    {
        id: 'KpiSocial',
        type: KpiBasic,
        roles: ['c','s','e'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-6 col-md-3'
    },
    {
        id: 'KpiTrafficInsight',
        type: KpiBasic,
        roles: ['c','s'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-12'
    },
    {
        id: 'KpiUrlRankings',
        type: KpiBasic,
        roles: ['c'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-6'
    },
    {
        id: 'ChartChannelInsight',
        type: ChartBasic,
        roles: ['c', 's'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-12'
    }
];

module.exports = ModuleCollection;