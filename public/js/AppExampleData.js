var config = require('./config');

module.exports = {
    init: function() {
        localStorage.clear();
        localStorage.setItem('moduleCollection', JSON.stringify([
            {
                id: 'KpiConversionInsight',
                type: 'KpiBasicModule',
                roles: ['c','s','e'],
                action: config.PATH_ROOT + 'branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-6 col-md-3',
                background: 'green'
            },
            {
                id: 'KpiSocial',
                type: 'KpiBasicModule',
                roles: ['c','s','e'],
                action: config.PATH_ROOT + 'branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-6 col-md-3',
                background: 'steelblue',
                filterParams: ['tags','interval']
            },
            {
                id: 'KpiTrafficInsight',
                type: 'KpiBasicModule',
                roles: ['c','s'],
                action: config.PATH_ROOT + 'branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-12',
                background: 'orange'
            },
            {
                id: 'KpiUrlRankings',
                type: 'KpiBasicModule',
                roles: ['c'],
                action: config.PATH_ROOT + 'branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-6',
                background: 'red'
            },
            {
                id: 'ChartChannelInsight',
                type: 'ChartBasicModule',
                roles: ['c'],
                action: config.PATH_ROOT + 'branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-12',
                background: 'lightgrey',
                filterParams: ['tags','engine']
            },
            {
                id: 'GridUrlRankings',
                type: 'GridBasicModule',
                roles: ['c','s','e'],
                action: config.PATH_ROOT + 'branches/suite7/controller_php/services/rankings/cs_visibility.php',
                className: 'col-sm-12',
                background: 'blue'
            }
        ]));
        localStorage.setItem('navigationConfig', JSON.stringify([
            {
                id: 1,
                name: 'Home',
                parentId: 0,
                path: '/home'
            },
            {
                id: 2,
                name: 'Rankings',
                parentId: 0,
                path: '/page/rankings'
            },
            {
                id: 15,
                name: 'Overview',
                parentId: 2,
                path: '/page/rankings-overview'
            },
            {
                id: 5,
                name: 'Organics Rankings',
                parentId: 2,
                path: '/page/organic-rankings'
            },
            {
                id: 7,
                name: 'Keyword Rankings',
                parentId: 5,
                path: '/page/keyword-rankings'
            },
            {
                id: 8,
                name: 'Ranking Analysis',
                parentId: 5,
                path: '/page/ranking-analysis'
            },
            {
                id: 9,
                name: 'Position Spread',
                parentId: 5,
                path: '/page/position-spread'
            },
            {
                id: 10,
                name: 'Keyword Potential',
                parentId: 5,
                path: '/page/keyword-potential'
            },
            {
                id: 11,
                name: 'Tag Potential',
                parentId: 5,
                path: '/page/tag-potential'
            },
            {
                id: 12,
                name: 'Market Insights',
                parentId: 5,
                path: '/page/market-insights'
            },
            {
                id: 13,
                name: 'Paid Rankings',
                parentId: 5,
                path: '/page/paid-rankings'
            },
            {
                id: 3,
                name: 'Links',
                parentId: 0,
                path: '/page/links'
            },
            {
                id: 4,
                name: 'Optimization',
                parentId: 0,
                path: '/page/optimization'
            },
            {
                id: 14,
                name: 'Traffic',
                parentId: 0,
                path: '/page/traffic'
            },
            {
                id: 6,
                name: 'URL Rankings',
                parentId: 5,
                path: '/page/url-rankings'
            },
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
