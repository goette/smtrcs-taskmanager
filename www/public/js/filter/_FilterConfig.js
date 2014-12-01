module.exports = {
    tags: {
        type: 'autosuggest',
        action: 'http://frontend.seometrie.dev/app/suite_frontend/branches/suite7/app/services/filter/tags.php',
        default: false // true: first option; false: empty
    },
    engine: {
        type: 'dropdown',
        action: 'http://frontend.seometrie.dev/app/suite_frontend/branches/suite7/app/services/filter/engines.php',
        default: true // true: first option; false: empty
    },
    interval: {
        type: 'dropdown',
        action: 'http://frontend.seometrie.dev/app/suite_frontend/branches/suite7/app/services/filter/tags.php',
        default: true // true: first option; false: empty
    }
};