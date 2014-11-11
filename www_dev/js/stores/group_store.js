var EventEmitter = require('event-emitter');
var React = require('react/addons');

var AppDispatcher = require('../dispatchers/app_dispatcher');
var GroupActions = require('../actions/group_actions');
var GroupConstants = require('../constants/group_constants');

var CHANGE_EVENT = 'change';
var _groups;

var GroupStore = React.addons.update(EventEmitter.prototype, {$merge: {

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.off(CHANGE_EVENT, callback);
  },

  dispatchToken: AppDispatcher.register(function ( payload ) {
    var action = payload.action;

    switch(action.actionType) {
      case GroupConstants.createGroup:
        GroupStore._createGroup( action.data )
        break;
    }

    return true;
  }),

  // private

  _createGroup: function ( data ) {
    blackIn.helpers.xhr.post(
      blackIn.helpers.routes.api_groups_url(),
      data,
      GroupStore._handleCreateResponse
    );
  },

  _handleCreateResponse: function ( err, reponse ) {
    if ( err ) {
      console.log('ERRRRRRRR ERRRRRRR ERRRRR');
    } else if ( response.status === 200 ) {
      console.log('SUCCESS');
    } else if ( response.status === 400 ) {
      console.log('400 :(');
    }
  }
}});

module.exports = GroupStore;
