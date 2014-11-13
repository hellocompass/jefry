var React = require('react/addons');
var TouchClick = require('../touch_click');

var NavSideBar = React.createClass({

  render: function () {
    return(
      <aside id="nav-side-bar-component">
        <h2>Sidebar!</h2>
      </aside>
    )
  }
});

module.exports = NavSideBar;
