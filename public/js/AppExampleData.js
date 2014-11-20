module.exports = {
    init: function() {
        localStorage.clear();
        localStorage.setItem('moduleCollection', JSON.stringify([
            {
                id: 'PageFilter',
                type: 'PageFilterModule',
                roles: ['c','s','e'],
                action: 'some/filter/action',
                defaultClassName: 'col-xs-12',
                background: 'lightgrey'
            },
            {
                id: 'KpiConversionInsight',
                type: 'KpiBasicModule',
                roles: ['c','s','e'],
                action: 'http://frontend.local/app/suite7/controller_php/services/rankings/cs_visibility.php',
                defaultClassName: 'col-sm-6 col-md-3',
                background: 'green'
            },
            {
                id: 'KpiSocial',
                type: 'KpiBasicModule',
                roles: ['c','s','e'],
                action: 'http://frontend.local/app/suite7/controller_php/services/rankings/cs_visibility.php',
                defaultClassName: 'col-sm-6 col-md-3',
                background: 'steelblue'
            },
            {
                id: 'KpiTrafficInsight',
                type: 'KpiBasicModule',
                roles: ['c','s'],
                action: 'http://frontend.local/app/suite7/controller_php/services/rankings/cs_visibility.php',
                defaultClassName: 'col-sm-12',
                background: 'orange'
            },
            {
                id: 'KpiUrlRankings',
                type: 'KpiBasicModule',
                roles: ['c'],
                action: 'http://frontend.local/app/suite7/controller_php/services/rankings/cs_visibility.php',
                defaultClassName: 'col-sm-6',
                background: 'red'
            },
            {
                id: 'ChartChannelInsight',
                type: 'ChartBasicModule',
                roles: ['c'],
                action: 'http://frontend.local/app/suite7/controller_php/services/rankings/cs_visibility.php',
                defaultClassName: 'col-sm-12',
                background: 'lightgrey'
            },
            {
                id: 'GridUrlRankings',
                type: 'GridBasicModule',
                roles: ['c','s','e'],
                action: 'http://frontend.local/app/suite7/controller_php/services/rankings/cs_visibility.php',
                defaultClassName: 'col-sm-12',
                background: 'blue'
            }
        ]));
        localStorage.setItem('pageConfig', JSON.stringify({
            url: '/some-page', // = id
            modulesOnPage: [ // Array of ordered modules
                {
                    id: 'PageFilter'
                },
                {
                    id: 'KpiConversionInsight'
                },
                {
                    id: 'KpiSocial'
                },
                {
                    id: 'KpiSocial'
                },
                {
                    id: 'KpiConversionInsight'
                },
                {
                    id: 'ChartChannelInsight'
                },
                {
                    id: 'GridUrlRankings'
                },
                {
                    id: 'KpiUrlRankings'
                },
                {
                    id: 'KpiUrlRankings'
                },
                {
                    id: 'KpiTrafficInsight'
                }
            ]
        }));
    }

};
