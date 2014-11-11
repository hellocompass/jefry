/** @jsx React.DOM */

var React = require('react/addons');
var SessionStore = require('../../stores/session_store');
var SessionActions = require('../../actions/session_actions');
var TouchClick = require('../core/touch_click');
var FlashComponent = require('../shared/flash_component');

var EmailSignupForm = React.createClass({

  getInitialState: function () {
    return {
      signup: this.props.signup,
      error: this.props.error
    };
  },

  componentWillReceiveProps: function ( props ) {
    this.setState({
      signup: props.signup,
      error: props.error
    });
  },

  handleEmailSubmit: function ( e ) {
    e.preventDefault();

    var data = {
      email: this.refs.email.getDOMNode().value.trim(),
      password: this.refs.password.getDOMNode().value.trim()
    };

    if ( this.state.signup ) {
      data.username = this.refs.username.getDOMNode().value.trim();
      data.password_confirmation = this.refs.passwordConfirmation.getDOMNode().value.trim();
      SessionActions.createUserWithEmail( data );
    } else {
      SessionActions.emailLogin( data );
    }
  },

  toggleSignup: function () {
    this.setState({ signup: !this.state.signup, error: false });
  },

  signupClass: function () {
    if ( this.state.signup ) {
      return '';
    } else {
      return 'hidden';
    }
  },

  submitCTA: function () {
    if ( this.state.signup ) {
      return 'Sign Up';
    } else {
      return 'Login';
    }
  },

  signupToggleData: function () {
    if ( this.state.signup ) {
      return { text: 'Already have an account?', cta: 'Login' }
    } else {
      return { text: 'First timer?', cta: 'Sign Up' }
    }
  },

  errorMessage: function () {
    if ( !this.state.error ) return [];

    if ( this.state.signup ) {
      return SessionStore.userErrors();
    } else {
      return [ "Whoops! Login info doesn't match a BlackIn user. Create Account instead?" ];
    }
  },

  render: function () {
    return(
      <div id="email-signup-form-component">
        <FlashComponent type={ 'error' } visible={ this.state.error }
          messages={ this.errorMessage() } />

        <form id="email-signup-form">
          <input ref="username" className={ this.signupClass() } type="text"
            id="user_name" name="user[name]" placeholder=" Name" />
          <input ref="email" type="email" id="user_email" name="user[email]"
            placeholder=" Email" />
          <input ref="password" type="password" id="user_password"
            name="user[password]" placeholder=" Password" />
          <input ref="passwordConfirmation" className={ this.signupClass() }
            type="password" id="user_password_confirmation"
            name="user[password_confirmation]" placeholder=" Password ONE MORE TIME" />

          <TouchClick handler={ this.handleEmailSubmit } className="button">
            { this.submitCTA() }
          </TouchClick>
        </form>

        <p className="signup-login-toggle">
          { this.signupToggleData().text }&nbsp;
          <TouchClick className="clickable" handler={ this.toggleSignup } nodeName="span">
            { this.signupToggleData().cta }
          </TouchClick>
        </p>
      </div>
    )
  }
});

module.exports = EmailSignupForm;
