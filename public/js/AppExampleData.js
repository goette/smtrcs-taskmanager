module.exports = {
    init: function() {
        localStorage.clear();
        localStorage.setItem('moduleCollection', JSON.stringify([
            {
                id: 'KpiConversionInsight',
                type: 'KpiBasicModule',
                roles: ['c','s','e'],
                action: 'http://frontend.local/app/branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-6 col-md-3',
                background: 'green'
            },
            {
                id: 'KpiSocial',
                type: 'KpiBasicModule',
                roles: ['c','s','e'],
                action: 'http://frontend.local/app/branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-6 col-md-3',
                background: 'steelblue',
                filterParams: ['tags','interval']
            },
            {
                id: 'KpiTrafficInsight',
                type: 'KpiBasicModule',
                roles: ['c','s'],
                action: 'http://frontend.local/app/branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-12',
                background: 'orange'
            },
            {
                id: 'KpiUrlRankings',
                type: 'KpiBasicModule',
                roles: ['c'],
                action: 'http://frontend.local/app/branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-6',
                background: 'red'
            },
            {
                id: 'ChartChannelInsight',
                type: 'ChartBasicModule',
                roles: ['c'],
                action: 'http://frontend.local/app/branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-12',
                background: 'lightgrey',
                filterParams: ['tags','engine']
            },
            {
                id: 'GridUrlRankings',
                type: 'GridBasicModule',
                roles: ['c','s','e'],
                action: 'http://frontend.local/app/branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-12',
                background: 'blue'
            }
        ]));
        /*localStorage.setItem('pageConfig', JSON.stringify({
            url: '/page1', // = id
            pageFilter: {
                roles: ['c','s','e'],
                blacklist: ['']
            },
            modulesOnPage: [ // Array of ordered modules
                {
                    id: 'KpiConversionInsight'
                },
                {
                    id: 'KpiSocial'
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
        }));*/
    }
};
