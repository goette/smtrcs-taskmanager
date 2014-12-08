var RemoveModule = require('../components/RemoveModuleComponent.js');

var remove = function (editMode, moduleIdOnPage) {
    if (editMode) {
        return <RemoveModule moduleIdOnPage={moduleIdOnPage} />;
    } else {
        return '';
    }
}

module.exports = remove;