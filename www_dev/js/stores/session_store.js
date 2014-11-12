var EventEmitter = require('event-emitter');
var React = require('react/addons');

var AppDispatcher = require('../dispatchers/app_dispatcher');
var AppConstants = require('../constants/app_constants')

var SessionActions = require('../actions/session_actions');
var SessionConstants = require('../constants/session_constants');

var CHANGE_EVENT = 'change';
var _currentUser, _userErrors;

var SessionStore = React.addons.update(EventEmitter.prototype, {$merge: {

  currentUser: function () {
    return _currentUser;
  },

  userErrors: function () {
    return _userErrors;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  loginSuccess: function () {
    SessionActions.notifyLogin();
    this.emitChange();
  },

  logoutSuccess: function () {
    _currentUser = null;
    SessionActions.notifyLogout();
    this.emitChange();
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.off(CHANGE_EVENT, callback);
  },

  dispatchToken: AppDispatcher.register(function ( payload ) {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.SET_CONTEXT:
        SessionStore._setCurrentUser( action.data.current_user.user )
        break;
      case SessionConstants.EMAIL_LOGIN:
        SessionStore._loginWithEmail( action.data );
        break;
      case SessionConstants.CREATE_USER_WITH_EMAIL:
        SessionStore._createAndSigninWithEmail( action.data );
        break;
      case SessionConstants.UPDATE_CURRENT_USER:
        SessionStore._updateCurrentUser( action.data );
        break;
      case SessionConstants.LOGOUT:
        SessionStore._deleteSession();
        break;
    }

    return true;
  }),

  // private

  _setCurrentUser: function ( user ) {
    _currentUser = user;
    SessionStore.emitChange();
  },

  _ensureCurrentUser: function () {
    if ( !SessionStore.currentUser() ) {
      blackIn.router.navigate(
        blackIn.helpers.routes.signin_path({ returnTo: document.location.pathname + document.location.search })
      );
    }
  },

  _deleteSession: function () {
    blackIn.helpers.xhr.request(
      'DELETE',
      blackIn.helpers.routes.api_signout_url(),
      function ( err, response ) {
        if ( !err ) SessionStore.logoutSuccess();
      }
    )
  },

  _loginWithEmail: function ( loginInfo ) {
    blackIn.helpers.xhr.post(
      blackIn.helpers.routes.api_signin_url(),
      { session: loginInfo },
      SessionStore._handleLoginResponse
    );
  },

  _createAndSigninWithEmail: function ( data ) {
    blackIn.helpers.xhr.post(
      blackIn.helpers.routes.api_users_url(),
      { user: data },
      SessionStore._handleLoginResponse
    );
  },

  _handleLoginResponse: function ( err, response ) {
    if ( err ) {
      alert("Well, that didn't work...try again?");
    } else if ( response.status === 200 ) {
      _currentUser = response.data.user;
      SessionStore.loginSuccess();
    } else if ( response.status === 400 ) {
      _userErrors = response.data.errors;
      SessionStore.emitChange();
    }
  },

  _updateCurrentUser: function ( data ) {
    blackIn.helpers.xhr.request('POST',
      blackIn.helpers.routes.api_user_url( _currentUser.id ),
      { user: data },
      function( err, response ) {
        if ( !err ) {
          if ( response.status == 200 ) {
            _currentUser = response.data.user;
            SessionStore.loginSuccess();
          } else {
            _userErrors = response.errors;
          }
        }
      }
    );
  }
}});

module.exports = SessionStore;
