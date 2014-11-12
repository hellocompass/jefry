var AppDispatcher = require('../dispatchers/app_dispatcher');
var AppConstants = require('../constants/app_constants');

var AppActions = {

  distributeContext: function ( data ) {
    AppDispatcher.handleAppRequest({
      actionType: AppConstants.SET_CONTEXT,
      data: data
    })
  }
};

module.exports = AppActions;
