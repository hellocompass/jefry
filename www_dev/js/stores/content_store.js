var EventEmitter = require('event-emitter');
var React = require('react/addons');

var AppDispatcher = require('../dispatchers/app_dispatcher');
var ContentConstants = require('../constants/content_constants');

var CHANGE_EVENT = 'change';
var _contents = {};
var _pendingContent;

var ContentStore = React.addons.update( EventEmitter.prototype, {$merge: {

  defaultData: {
    image: null,
    user_ids: [],
    group_id: null
  },

  newContent: function ( data ) {
    var accessibleAttrs = Object.keys( this.defaultData );
    var cleanData = {};

    for ( var i = 0; i < accessibleAttrs.length; i++ ) {
      if ( typeof data[accessibleAttrs[i]] === 'undefined' ) continue;
      cleanData[accessibleAttrs[i]] = data[accessibleAttrs[i]];
    }

    _pendingContent = React.addons.update( this.defaultData, {$merge: cleanData} );

    return _pendingContent;
  },

  getPendingContent: function () {
    if ( !_pendingContent ) this.newContent();
    return _pendingContent;
  },

  addChangeListener: function ( callback ) {
    this.on( CHANGE_EVENT, callback );
  },

  removeChangeListener: function ( callback ) {
    this.off( CHANGE_EVENT, callback );
  },

  emitChange: function () {
    this.emit( CHANGE_EVENT );
  }
}});

module.exports = ContentStore;
