var config = require('../config');

module.exports = {
    tags: {
        type: 'autosuggest',
        action: config.PATH_ROOT + 'controller_php/services/filter/tags.php',
        default: false // true: first option; false: empty
    },
    engine: {
        type: 'dropdown',
        action: config.PATH_ROOT + 'controller_php/services/filter/engines.php',
        default: true // true: first option; false: empty
    },
    interval: {
        type: 'dropdown',
        action: config.PATH_ROOT + 'controller_php/services/filter/tags.php',
        default: true // true: first option; false: empty
    }
};