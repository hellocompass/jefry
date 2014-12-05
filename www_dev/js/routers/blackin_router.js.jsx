/** @jsx React.DOM */

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) {
    for (var key in parent) {
      if (__hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
  };

var React = require('react/addons');
var Router = require('./router');

var AppDispatcher = require('../dispatchers/app_dispatcher');

var GroupConstants = require('../constants/group_constants');
var SessionConstants = require('../constants/session_constants');

var App = require('../components/core/app');
var Capture = require('../components/groups/capture');
var Feed = require('../components/groups/feed');
var GroupForm = require('../components/groups/group_form');
var Home = require('../components/home');
var LoginForm = require('../components/login/login_form');

var GroupStore = require('../stores/group_store');

var BlackInRouter = (function ( _super ) {
  __extends(BlackInRouter, _super);

  function BlackInRouter () {
    return BlackInRouter.__super__.constructor.apply(this, arguments);
  }

  BlackInRouter.prototype.initialize = function () {
    this.appContainer = document.getElementById('app-container');
    React.render( <App />, this.appContainer );
  };

  BlackInRouter.prototype.routes = {
    'groups/new' : 'newGroup',
    'groups/:id' : 'showGroup',
    'groups/:id/capture'    : 'groupCapture',
    'home' : 'home',
    'signin' : 'signin',
  };

  BlackInRouter.prototype.newGroup = function () {
    this.changePage( <GroupForm />, {title: 'Create a BlackIn'} )
  };

  BlackInRouter.prototype.showGroup = function ( id ) {
    var _this = this;

    GroupStore.getGroup( id, function ( group ) {
      _this.changePage( <Feed />, {title: group.name} )
    });
  };

  BlackInRouter.prototype.groupCapture = function ( id ) {
    var _this = this;

    GroupStore.getGroup( id, function ( group ) {
      _this.changePage( <Capture group={ group } />, {title: group.name} )
    });
  };

  BlackInRouter.prototype.home = function () {
    this.changePage( <Home /> )
  };

  BlackInRouter.prototype.signin = function () {
    this.changePage( <LoginForm />, {hideNav: true} );
  };

  BlackInRouter.prototype.changePage = function ( component, options ) {
    if ( options == null ) options = {};

    if ( this.initialRoute ) return;
    this.closeModal();

    React.render(
      <App page={ component }
           topBar={ !options.hideNav }
           sideBar={ false }
           title={ options.title } />,
      this.appContainer
    );
  };

  BlackInRouter.prototype.openModal = function ( component ) {
    if  ( this.modal == null ) {
      this.modal = document.getElementById('blackIn-modal-container');
    }

    React.render(
      <Modal component={ component } />,
      this.modal
    );
    this.modal.className += ' active';
  };

  BlackInRouter.prototype.closeModal = function () {
    if ( !this.modal ) return;

    var newClassName = this.modal.className.replace( /(?:^|\s)active(?!\S)/g , '' );
    React.unmountComponentAtNode(this.modal);
    this.modal.className = newClassName;
  };

  BlackInRouter.prototype.dispatchToken = AppDispatcher.register ( function ( payload ) {
    var action = payload.action;

    switch ( action.actionType ) {
      case SessionConstants.LOGIN_SUCCESS:
        blackIn.router.navigate( blackIn.helpers.routes.home_path() );
        break;
      case GroupConstants.NEW_GROUP:
        blackIn.router.navigate( blackIn.helpers.routes.new_group_path() );
        break;
      case GroupConstants.NAVIGATE:
        blackIn.router.navigate( action.data.route )
        break;
    }

    return true
  });

  return BlackInRouter;

})(Router);

module.exports = BlackInRouter;
