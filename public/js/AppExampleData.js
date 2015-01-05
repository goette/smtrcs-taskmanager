module.exports = {
    init: function() {
        localStorage.clear();
        localStorage.setItem('taskCollection', JSON.stringify([
            {
                id: 'task1',
                name: 'First Task',
                text: 'Create this new visibility report for customer XYZ',
                assignee: 'Martin'
            }
        ]));
    }
};
