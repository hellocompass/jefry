var React = require('react/addons');
var TouchClick = require('../touch_click');

var NavTopBar = React.createClass({

  render: function () {
    return(
      <header id="nav-top-bar-component">
        <h4>
          <TouchClick className="ion-navicon" nodeName="i"
            handler={ this.props.menuHandler } />
          Black <span className="bold">In</span>
        </h4>
      </header>
    )
  }
});

module.exports = NavTopBar;
