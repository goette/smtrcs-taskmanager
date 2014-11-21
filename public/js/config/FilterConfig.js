module.exports = {
    tags: {
        type: 'autosuggest',
        action: 'some/tags/action',
        default: false // true: first option; false: empty
    },
    engine: {
        type: 'dropdown',
        action: 'some/engine/action',
        default: true // true: first option; false: empty
    }
};