/**
 * @jsx React.DOM
 */

var RemoveModule = require('../components/RemoveModuleComponent.js');

var remove = function (editMode, pageId) {
    if (editMode) {
        return <RemoveModule pageId={pageId} />;
    } else {
        return '';
    }
}

module.exports = remove;