# Components

## Description
Components (as in React-Components) are the smallest UI-parts of the application. They can be clustered in groups to form new reusable components. Modules consist of one or more components / component-groups. Components are built in React, they don't have their own store. They trigger actions of the module they are contained in.

```
var Actions = require('../actions/actions');

var Checkbox = React.createClass({
		_onClick = function () {
			if(Actions[this.props.clickAction]) Actions[this.props.clickAction];
		}
	},
	render: function () {
		return (
			<input onClick={this._onClick} type="checkbox" checked={this.props.checked}>
		);
	}
});
```