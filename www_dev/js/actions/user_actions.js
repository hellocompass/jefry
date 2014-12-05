var AppDispatcher = require('../dispatchers/app_dispatcher');

var UserConstants = require('../constants/user_constants');

var UserActions = {

  notifyGroupUsers: function ( users ) {
    AppDispatcher.handleStoreRequest ({
      actionType: UserConstants.ADD_GROUP_USERS,
      data: users
    })
  }
};

module.exports = UserActions;
