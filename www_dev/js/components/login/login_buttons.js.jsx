var React = require('react/addons');
var TouchClick = require('../core/touch_click');

var LoginButtons = React.createClass({
  render: function () {
    return(
      <div id="login-buttons-component">
        <TouchClick handler={ this.props.handlers.signup } className="button">
          Sign Up
        </TouchClick>

        <TouchClick handler={ this.props.handlers.login } className="button">
          Login
        </TouchClick>
      </div>
    );
  }
});

module.exports = LoginButtons;
