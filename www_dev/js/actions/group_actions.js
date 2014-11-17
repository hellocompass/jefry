var AppDispatcher = require('../dispatchers/app_dispatcher');
var GroupConstants = require('../constants/group_constants');

var GroupActions = {

  createGroup: function ( data ) {
    AppDispatcher.handleViewAction({
      actionType: GroupConstants.CREATE_GROUP,
      data: data
    });
  },

  newGroup: function () {
    AppDispatcher.handleViewAction({
      actionType: GroupConstants.NEW_GROUP,
      data: {}
    });
  },
};

module.exports = GroupActions;
