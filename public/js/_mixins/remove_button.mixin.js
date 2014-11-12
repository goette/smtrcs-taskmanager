/**
 * @jsx React.DOM
 */

var RemoveModule = require('../components/remove_module.component');

var remove = function (editMode, pageId) {
    if (editMode) {
        return <RemoveModule pageId={pageId} />;
    } else {
        return '';
    }
}

module.exports = remove;