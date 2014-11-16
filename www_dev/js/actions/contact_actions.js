var AppDispatcher = require('../dispatchers/app_dispatcher');
var ContactConstants = require('../constants/contact_constants');

var ContactActions = {

  getAll: function () {
    AppDispatcher.handleViewAction({
      actionType: ContactConstants.GET_ALL,
      data: {}
    });
  },

  toggleActive: function ( id ) {
    AppDispatcher.handleViewAction({
      actionType: ContactConstants.TOGGLE_ACTIVE,
      data: { id: id }
    });
  }
};

module.exports = ContactActions;
