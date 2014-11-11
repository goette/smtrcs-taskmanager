var KpiBasic = require('../modules/kpi_basic.module');

module.exports = [
    {
        id: 'KpiConversionInsight',
        type: KpiBasic,
        roles: ['c','s','e'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-4'
    },
    {
        id: 'KpiSocial',
        type: KpiBasic,
        roles: ['c','s','e'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-sm-4'
    },
    {
        id: 'KpiTrafficInsight',
        type: KpiBasic,
        roles: ['c','s'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-md-12'
    },
    {
        id: 'KpiUrlRankings',
        type: KpiBasic,
        roles: ['c'],
        action: 'traffic/channel-distribution',
        defaultClassName: 'col-md-6'
    }
];