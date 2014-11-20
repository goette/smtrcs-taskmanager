var InitStoreInComponent = {
    getInitialState: function () {
        return this.getStateFromStore();
    },

    _onChange: function () {
        this.setState(this.getStateFromStore());
    },

    componentDidMount: function () {
        this.store.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        this.store.removeChangeListener(this._onChange);
    }
};

module.exports = InitStoreInComponent;