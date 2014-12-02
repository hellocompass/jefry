var EventEmitter = require('event-emitter');
var React = require('react/addons');

var AppDispatcher = require('../dispatchers/app_dispatcher');
var ContactStore = require('./contact_store');
var GroupActions = require('../actions/group_actions');
var GroupConstants = require('../constants/group_constants');

var CHANGE_EVENT = 'change';
var _groups;
var _pendingGroup = {};

var setGroup = function ( group ) {
  _groups[group.id] = group;
};

var GroupStore = React.addons.update(EventEmitter.prototype, {$merge: {

  getGroup: function ( id, callback ) {
    if ( _groups[id] ) return callback( _groups[id] );

    blackIn.helpers.xhr.get(
      blackIn.helpers.routes.api_group_url( id ),
      function ( err, response ) {
        if ( err || response.status !== 200 ) {
          // stub
        } else {
          setGroup( response.data.group );
          callback( _groups[id] );
        }
      }
    )
  },

  getErrors: function () {
    return _pendingGroup.errors;
  },

  addChangeListener: function( callback ) {
    this.on( CHANGE_EVENT, callback );
  },

  removeChangeListener: function( callback ) {
    this.off( CHANGE_EVENT, callback );
  },

  emitChange: function () {
    this.emit( CHANGE_EVENT );
  },

  dispatchToken: AppDispatcher.register(function ( payload ) {
    var action = payload.action;

    switch( action.actionType ) {
      case GroupConstants.CREATE_GROUP:
        GroupStore._createGroup( action.data )
        break;
    }

    return true;
  }),

  // private

  _createGroup: function ( data ) {
    _pendingGroup = data;
    _pendingGroup.contacts = ContactStore.getActiveContacts();

    blackIn.helpers.xhr.post(
      blackIn.helpers.routes.api_groups_url(),
      { group: _pendingGroup },
      GroupStore._handleCreateResponse
    );
  },

  _handleCreateResponse: function ( err, response ) {
    if ( err ) {
      console.log('ERRRRRRRR ERRRRRRR ERRRRR');
    } else if ( response.status === 200 ) {
      setGroup( response.data.group );
      _pendingGroup = {};
      RouterActions.navigate(
        blackIn.helpers.routes.group_path( response.data.group.id )
      );
    } else if ( response.status === 400 ) {
      _pendingGroup.errors = response.data.errors;
      GroupStore.emitChange();
    }
  }
}});

module.exports = GroupStore;
