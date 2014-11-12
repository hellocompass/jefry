var _csrfHeaders;

var XhrHelper = function () {
}

XhrHelper.prototype.request = function (type, url, opts, callback) {
  var xhr = new XMLHttpRequest(),
      pd;

  _csrfHeaders = getCSRFHeaders()

  xhr.withCredentials = true;

  if (typeof opts === 'function') {
    callback = opts;
    opts = null;
  }

  xhr.open(type, url);

  // xhr.setRequestHeader("Access-Control-Request-Headers", 'X-CSRF-Param, X-CSRF-Token')
  xhr.setRequestHeader("X-CSRF-Param", _csrfHeaders.param);
  xhr.setRequestHeader("X-CSRF-Token", _csrfHeaders.token);

  if (type === 'POST' && opts) {
    if ( opts.authenticity_token == null ) opts.authenticity_token = _csrfHeaders.token;
    pd = JSON.stringify(opts);
    xhr.setRequestHeader('Content-Type', 'application/json');
  }

  xhr.onload = function () {
    setCSRFHeaders( xhr );
    console.log(xhr.response);
    var res = {data: JSON.parse(xhr.response), status: xhr.status};
    return callback.call(xhr, null, res);
  };

  xhr.onerror = function () {
    console.log(xhr.response);
    return callback.call(xhr, true);
  };

  xhr.send(opts ? pd : null);

  return xhr;
};

XhrHelper.prototype.get = XhrHelper.prototype.request.bind(this, 'GET');
XhrHelper.prototype.post = XhrHelper.prototype.request.bind(this, 'POST');

var setCSRFHeaders = function ( xhr ) {
  var csrf_param, csrf_token;
  var res = JSON.parse( xhr.response );

  if ( !!res.csrf_param && !!res.csrf_token ) {
    csrf_param = res.csrf_param;
    csrf_token = res.csrf_token;
  } else {
    csrf_param = xhr.getResponseHeader('X-CSRF-Param');
    csrf_token = xhr.getResponseHeader('X-CSRF-Token');
  }

  if (csrf_param) {
    _csrfHeaders.param = csrf_param;
  }
  if (csrf_token) {
    _csrfHeaders.token = csrf_token;
  }
}

var getCSRFHeaders = function () {
  if ( _csrfHeaders != null ) return _csrfHeaders;

  _csrfHeaders = {};
  _csrfHeaders.token = '';
  _csrfHeaders.param = '';

  return _csrfHeaders;
}

module.exports = XhrHelper;
