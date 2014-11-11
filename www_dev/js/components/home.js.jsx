var React = require('react/addons');

var TouchClick = require('./core/touch_click');

var GroupActions = require('../actions/group_actions');

var Home = React.createClass({

  newGroup: function () {
    GroupActions.newGroup();
  },

  render: function () {
    return(
      <div id="home-component">
        <div className="wrapper">
          <header className="header-box">
            <h1>Fuck it, we're<br />doin' it live...</h1>
          </header>

          <TouchClick className="button round thick create-plus" handler={ this.newGroup }>
            +
          </TouchClick>

          <h3>Create a BlackIn group</h3>
        </div>
      </div>
    )
  }
});

module.exports = Home;
