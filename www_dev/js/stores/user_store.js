var EventEmitter = require('event-emitter');
var React = require('react/addons');

var AppDispatcher = require('../dispatchers/app_dispatcher');

var UserConstants = require('../constants/user_constants');

var _users = {};

var mergeUsers = function ( users ) {
  var newUserCount = users.length;

  for ( var i = 0; i < newUserCount; i++ ) {
    if ( !!_users[users[i].id] ) {
      _users[users[i].id] = React.addons.update( _users[users[i].id], {$merge: users[i]} );
    } else {
      _users[users[i].id] = users[i];
    }
  }
};

var UserStore = React.addons.update(EventEmitter.prototype, {$merge: {

  getGroupUsers: function ( groupId ) {
    var userList = this.userList();
    return _( userList ).where({ group_id: groupId });
  },

  userList: function () {
    var list = [];

    for ( var key in _users ) {
      if ( _users.hasOwnProperty( key ) ) {
        list.push( _users[key] );
      }
    }

    return list;
  },

  dispatchToken: AppDispatcher.register( function ( payload ) {
    var action = payload.action;

    switch( action.actionType ) {
      case UserConstants.ADD_GROUP_USERS:
        mergeUsers( action.data );
        break;
    }

    return true;
  })
}});

module.exports = UserStore;
