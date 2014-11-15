var React = require('react/addons');

var NavTopBar = require('./navigation/nav_top_bar');
var NavSideBar = require('./navigation/nav_side_bar');

var App = React.createClass({

  getInitialState: function () {
    return {
      page: this.props.page,
      topBar: false,
      sideBar: false
    };
  },

  componentWillReceiveProps: function ( props ) {
    this.setState({
      page: props.page,
      topBar: props.topBar,
      sideBar: props.sideBar
    });
  },

  toggleSidebar: function () {
    var _this = this;

    this.setState({
      page: this.state.page,
      sideBar: !this.state.sideBar
    })

    _.defer( function () {
      if ( _this.sideBar !== null ) {
        document.getElementById('nav-side-bar-component').className += ' active';
      }
    });
  },

  sidebarShiftClass: function () {
    return this.state.sideBar ? 'sidebar-shift' : ''
  },

  render: function () {
    this.topBar = this.state.topBar ? <NavTopBar menuHandler={ this.toggleSidebar } /> : null
    this.sideBar = this.state.sideBar ? <NavSideBar closeHandler={ this.toggleSidebar } /> : null

    return(
      <div id="app-component">
        { this.sideBar }
        <div id="page-wrapper" className={ this.sidebarShiftClass() }>
          <div id="inner-page">
            { this.topBar }
            { this.state.page }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
