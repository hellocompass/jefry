var React = require('react/addons');
var TouchClick = require('../touch_click');

var SessionStore = require('../../../stores/session_store');

var NavSideBar = React.createClass({

  activeClass: function ( href ) {
    return href === blackIn.router.currentPathname() ? 'active' : '';
  },

  render: function () {
    return(
      <aside id="nav-side-bar-component">
        <div className="header-box">
          <h3>{ SessionStore.currentUser().username }</h3>
        </div>

        <nav>
          <ul>
            <li>
              <a href="/camera" className={ this.activeClass( '/camera' ) }>
                Camera
              </a>
            </li>

            <li>
              <a href="/home" className={ this.activeClass( '/home' ) }>
                Home
              </a>
            </li>

            <li>
              <a href="/archive" className={ this.activeClass( '/archive' ) }>
                Archive
              </a>
            </li>

            <li>
              <a href="/connections/snapchat/new"
                className={ this.activeClass( '/connections/snapchat/new' ) }>
                  Connect Snapchat
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    )
  }
});

module.exports = NavSideBar;
