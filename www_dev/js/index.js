var BlackInRouter = require('./routers/blackin_router');

var RoutesHelper = require('./helpers/routes_helper');
var UrlHelper = require('./helpers/url_helper');
var XhrHelper = require('./helpers/xhr_helper');

var AppActions = require('./actions/app_actions');
var AppConstants = require('./constants/app_constants');

var SessionStore = require('./stores/session_store');

var _readyEvents = [];

var blackIn = {
  initialize: function () {
    blackIn.router = new BlackInRouter();
    this.bindEvents();
    blackIn.env = 'development';
    this.initializeHelpers();
    blackIn.bootstrapContext();
  },

  initializeHelpers: function () {
    blackIn.helpers = {
      routes: new RoutesHelper(),
      url: new UrlHelper(),
      xhr: new XhrHelper()
    }
  },

  bootstrapContext: function () {
    blackIn.helpers.xhr.get(
      blackIn.helpers.routes.api_bootstrap_url(),
      function ( err, response ) {
        if ( err ) {
          alert('Bootstrap data failed');
        } else {
          AppActions.distributeContext( response.data );
          blackIn.goHome( 'bootstrapped!' )
        }
      }
    )
  },

  bindEvents: function () {
    document.addEventListener('deviceready', this.goHome, false);
    document.addEventListener('DOMContentLoaded', this.goHome, false);
  },

  goHome: function ( e ) {
    _readyEvents.push( e );
    if ( _readyEvents.length < 3 ) return;

    console.log('LETTTSSSSS GOOOOOO');
    blackIn.router.navigate( this.firstPage() );
  },

  firstPage: function () {
    var search = blackIn.helpers.url.queryObject()
    if ( !!search.page ) return search.page;

    return SessionStore.currentUser() ? '/home' : '/signin';
  }
}

window.blackIn = blackIn;
blackIn.initialize();
