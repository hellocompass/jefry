/** @jsx React.DOM */

var React = require('react/addons');

var SessionActions = require('../../actions/session_actions');

var SessionStore = require('../../stores/session_store');
var EmailSignupForm = require('./email_signup_form');
var LoginButtons = require('./login_buttons');

var LoginForm = React.createClass({

  getInitialState: function () {
    return {
      formVisible: false,
      error: false,
    };
  },

  toggleEmailForm: function () {
    this.setState({
      emailSignup: !this.state.emailSignup,
      error: false
    });
  },

  showLogin: function () {
    this.setState({
      formVisible: true,
      signup: false
    });
  },

  showSignup: function () {
    this.setState({
      formVisible: true,
      signup: true
    });
  },

  getComponent: function () {
    if ( this.state.formVisible ) {
      return <EmailSignupForm error={ this.state.error } signup={ this.state.signup } />
    } else {
      return <LoginButtons handlers={ { signup: this.showSignup, login: this.showLogin } } />
    }
  },

  componentDidMount: function () {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    SessionStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return(
      <div id="login-form-component">
        <div className="header-box">
          <h1 id="headline">Black <span className="bold">In</span></h1>
          <h4 className="subheader">We'll remember for you...</h4>
        </div>

        { this.getComponent() }
      </div>
    );
  },

  // private

  _onChange: function () {
    user = SessionStore.currentUser();
    if ( user && user.id ) {
      SessionActions.notifyLogin();
    } else {
      this.setState({
        emailSignup: this.state.emailSignup,
        error: true
      });
    }
  }
});

module.exports = LoginForm;
