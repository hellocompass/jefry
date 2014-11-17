var EventEmitter = require('event-emitter');
var React = require('react/addons');

var AppDispatcher = require('../dispatchers/app_dispatcher');

var ContactActions = require('../actions/contact_actions');
var ContactConstants = require('../constants/contact_constants');

var CHANGE_EVENT = 'change';
var _contacts = {};

var setContacts = function ( contacts ) {
  resetContacts();

  for ( var i = 0; i < contacts.length; i++ ) {
    contacts[i].active = false;
    _contacts[contacts[i].id] = contacts[i];
  }

  ContactStore.emitChange();
};

var resetContacts = function () {
  _contacts = {};
};

var ContactStore = React.addons.update(EventEmitter.prototype, {$merge: {

  contacts: function () {
    return _contacts;
  },

  contactsList: function () {
    var list = [];

    for ( var key in _contacts ) {
      if ( _contacts.hasOwnProperty( key ) ) {
        list.push( _contacts[key] );
      }
    }

    return list;
  },

  getActiveContacts: function () {
    return _( this.contactsList() ).where({ active: true });
  },

  toggleActiveContact: function ( id ) {
    _contacts[id].active = !_contacts[id].active;
    this.emitChange();
  },

  requestContacts: function () {
    var options, fields;
    options = new ContactFindOptions();
    options.filter = '';
    options.multiple = true;
    fields = ["id", "photos", "name", "phoneNumbers", "emails"];
    navigator.contacts.find( fields, setContacts, ContactStore.alertNotContacts, options );
  },

  emitChange: function ( contacts ) {
    this.emit( CHANGE_EVENT );
  },

  alertNoContacts: function ( res ) {
    console.log('CONTACTS DENIED');
    console.log(res);
  },

  addChangeListener: function( callback ) {
    this.on( CHANGE_EVENT, callback );
  },

  removeChangeListener: function( callback ) {
    this.off( CHANGE_EVENT, callback );
  },

  dispatchToken: AppDispatcher.register( function ( payload ) {
    var action = payload.action;

    switch( action.actionType ) {
      case ContactConstants.GET_ALL:
        ContactStore.requestContacts();
        break;
      case ContactConstants.TOGGLE_ACTIVE:
        ContactStore.toggleActiveContact( action.data.id );
        break;
    }

    return true;
  })
}});

module.exports = ContactStore;
