module.exports = {
    tags: {
        type: 'autosuggest',
        action: 'http://frontend.local/app/branches/suite7/controller_php/services/filter/tags.php',
        default: false // true: first option; false: empty
    },
    engine: {
        type: 'dropdown',
        action: 'http://frontend.local/app/branches/suite7/controller_php/services/filter/engines.php',
        default: true // true: first option; false: empty
    },
    interval: {
        type: 'dropdown',
        action: 'http://frontend.local/app/branches/suite7/controller_php/services/filter/tags.php',
        default: true // true: first option; false: empty
    }
};