var AppDispatcher = require('../dispatchers/app_dispatcher');
var SessionConstants = require('../constants/session_constants');

var SessionActions = {

  logout: function () {
    AppDispatcher.handleViewAction({
      actionType: SessionConstants.LOGOUT,
      data: {}
    });
  },

  emailLogin: function ( loginInfo ) {
    AppDispatcher.handleViewAction({
      actionType: SessionConstants.EMAIL_LOGIN,
      data: loginInfo
    })
  },

  createUserWithEmail: function ( userInfo ) {
    AppDispatcher.handleViewAction({
      actionType: SessionConstants.CREATE_USER_WITH_EMAIL,
      data: userInfo
    })
  },

  updateCurrentUser: function ( data ) {
    AppDispatcher.handleViewAction({
      actionType: SessionConstants.UPDATE_CURRENT_USER,
      data: data
    });
  },

  notifyLogin: function () {
    AppDispatcher.handleStoreRequest({
      actionType: SessionConstants.LOGIN_SUCCESS,
      data: {}
    })
  },

  notifyLogout: function () {
    AppDispatcher.handleStoreRequest({
      actionType: SessionConstants.LOGOUT_SUCCESS,
      data: {}
    })
  }
}

module.exports = SessionActions;
