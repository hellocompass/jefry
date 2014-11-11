var BlackInRouter = require('./routers/blackin_router');

var RoutesHelper = require('./helpers/routes_helper');
var UrlHelper = require('./helpers/url_helper');
var XhrHelper = require('./helpers/xhr_helper');

var _readyEvents = [];

var blackIn = {
  initialize: function () {
    blackIn.env = 'development';
    blackIn.router = new BlackInRouter();
    this.initializeHelpers();
    this.bindEvents();
  },

  initializeHelpers: function () {
    blackIn.helpers = {
      routes: new RoutesHelper(),
      url: new UrlHelper(),
      xhr: new XhrHelper()
    }
  },

  bindEvents: function () {
    document.addEventListener('deviceready', this.goHome, false);
    document.addEventListener('DOMContentLoaded', this.goHome, false);
  },

  goHome: function ( e ) {
    _readyEvents.push( e );
    if ( _readyEvents.length < 2 ) return;

    console.log('LETTTSSSSS GOOOOOO');

    var search = blackIn.helpers.url.queryObject()
    var page = !!search.page ? search.page : '/signin';
    blackIn.router.navigate(page);
  }
}

window.blackIn = blackIn;
blackIn.initialize();
