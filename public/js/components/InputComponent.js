var React = require('react');

var Input = React.createClass({
    render: function () {
        return (
            <div className="col-xs-12 input">
                <input type="text" className="form-control" placeholder="Enter title" />
                <textarea className="form-control" rows="3" placeholder="Enter description"></textarea>
            </div>
        );
    }
});

module.exports = Input;