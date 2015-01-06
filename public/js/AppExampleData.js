module.exports = {
    init: function() {
        if (!localStorage.getItem('taskCollection')) {
            localStorage.clear();
            localStorage.setItem('taskCollection', JSON.stringify([
                {
                    id: 'dummytask1',
                    title: 'First Task',
                    description: 'Create this new visibility report for customer XYZ',
                    completed: false
                },
                {
                    id: 'dummytask2',
                    title: 'Second Task',
                    description: 'Check out the second default task',
                    completed: false
                },
                {
                    id: 'dummytask3',
                    title: 'Another Task',
                    description: '',
                    completed: false
                }
            ]));
        }
    }
};
