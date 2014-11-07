module.exports = [
    {
        url: 'string', // = id
        modulesOnPage: [ // Array of ordered modules
            {
                id: num // the "real" id, as given in the module pool
                key: 'string', // unique identifier of modle on page
                type: 'string', // what kind of module is it?
                className: 'string' // bootstrap grid classes, i.e. "col-xs-12 col-sm-6 col-md-3" determines width of module in context
            },
            {
                id: num // the "real" id, as given in the module pool,
                key: 'string', // unique identifier of modle on page
                type: 'string', // what kind of module is it?
                className: 'string' // bootstrap grid classes, i.e. "col-xs-12 col-sm-6 col-md-3" determines width of module in context
            }
        ]
    }
];