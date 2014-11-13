var React = require('react/addons');
var TouchClick = require('../touch_click');

var NavTopBar = React.createClass({

  render: function () {
    return(
      <header id="nav-top-bar-component">
        <h3>
          <TouchClick className="ion-navicon-round" nodeName="i"
            handler={ this.props.menuHandler } />
          Black <span className="bold">In</span>
        </h3>
      </header>
    )
  }
});

module.exports = NavTopBar;
