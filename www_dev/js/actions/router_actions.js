var AppDispatcher = require('../dispatchers/app_dispatcher');
var RouterConstants = require('../constants/router_constants');

var RouterActions = {

  navigate: function ( path ) {
    AppDispatcher.handleStoreRequest({
      ActionType: RouterConstants.NAVIGATE,
      data: { route: path }
    })
  }
}

module.exports = RouterActions;
