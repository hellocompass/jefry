var React = require('react/addons');

React.initializeTouchEvents(true)

var TouchClick = React.createClass({

  defaults: {
    touched: false,
    touchdown: false,
    enabled: false,
    coords: { x:0, y:0 },
    evObj: {}
  },

  enable: function () {
    if ( !this.state.enabled ) {
      if ( this.isMounted() ) {
        this.setState({
          touched: this.state.touched,
          touchdown: this.state.touchdown,
          enabled: true,
          coords: this.state.coords,
          evObj: this.state.evObj
        });
      } else {
        setTimeout(this.enable, 500);
      }
    }
  },

  getInitialState: function() {
    return this.defaults
  },

  handler: function() {
    typeof this.props.handler == 'function' && this.props.handler.apply(this, arguments)
  },

  getCoords: function(e) {
    if ( e.touches && e.touches.length ) {
      var touch = e.touches[0]
      return {
        x: touch.pageX,
        y: touch.pageY
      }
    }
  },

  onTouchStart: function(e) {
    this.setState({
      touched: true,
      touchdown: true,
      coords: this.getCoords(e),
      evObj: e
    })
  },

  onTouchMove: function(e) {
    var coords = this.getCoords(e)
    var distance = Math.max(
      Math.abs(this.state.coords.x - coords.x),
      Math.abs(this.state.coords.y - coords.y)
    )
    if ( distance > 6 )
      this.setState({ touchdown: false })
  },

  onTouchEnd: function() {
    if ( this.state.touchdown && this.state.enabled ) {
      this.handler.call(this, this.state.evObj)
    }
    setTimeout(function() {
      if ( this.isMounted() )
        this.setState(this.defaults)
    }.bind(this), 4)
  },

  onClick: function() {
    if ( this.state.touched && this.state.enabled )
      return false
    this.setState(this.defaults)
    this.handler.apply(this, arguments)
  },

  render: function() {
    var classNames = ['touchclick']

    this.props.className && classNames.push(this.props.className)
    this.state.touchdown && classNames.push('touchdown')

    setTimeout(this.enable, 800);

    return React.DOM[this.props.nodeName || 'button']({
      className: classNames.join(' '),
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd,
      onClick: this.onClick
    }, this.props.children)
  }
})

module.exports = TouchClick;
