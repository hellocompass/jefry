var RouterConstants = require('../constants/router_constants');

var RouterActions = {

  navigate: function ( path ) {
    AppDispatcher.dispatch({
      ActionType: RouterConstants.NAVIGATE,
      data: { route: path }
    })
  }
}

module.exports = RouterActions;
