var RoutesHelper = function () {
  var _urlRoot;
  setUrlRoot();
}

var setUrlRoot = function () {
  if (blackIn.env === 'production') {
    _urlRoot = 'http://blck.in';
  } else {
    _urlRoot = 'http://blck.dev:3000';
  }
};

// API urls

RoutesHelper.prototype.api_bootstrap_url = function () {
  return _urlRoot + '/api/app/bootstrap';
};

RoutesHelper.prototype.api_groups_url = function () {
  return _urlRoot + '/api/groups';
};

RoutesHelper.prototype.api_group_url = function ( id ) {
  return _urlRoot + '/api/groups/' + id;
};

RoutesHelper.prototype.api_signin_url = function () {
  return _urlRoot + '/api/sessions';
};

RoutesHelper.prototype.api_users_url = function () {
  return _urlRoot + '/api/users';
};

// App paths, in alphabetical order by path

RoutesHelper.prototype.group_path = function ( id ) {
  return '/groups/' + id;
}

RoutesHelper.prototype.new_group_path = function () {
  return '/groups/new';
};

RoutesHelper.prototype.home_path = function () {
  return '/home';
};

RoutesHelper.prototype.signin_path = function ( params ) {
  return '/signin' + queryString( params );
};

var queryString = function ( params ) {
  var query = '';

  if ( params != null && !_(params).isEmpty() ) {
    query = '?';
    for ( key in params ) {
      query += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
    }
  }

  return query.substring(0, query.length - 1);
};

module.exports = RoutesHelper;
