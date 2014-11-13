var React = require('react/addons');

var NavTopBar = require('./navigation/nav_top_bar');

var App = React.createClass({

  getInitialState: function () {
    return {
      page: this.props.page,
      topBar: false,
      sidebar: false
    };
  },

  componentWillReceiveProps: function ( props ) {
    this.setState({
      page: props.page,
      topBar: props.topBar
    });
  },

  toggleSidebar: function () {
    this.setState({
      page: this.state.page,
      sidebar: !this.state.sidebar
    })
  },

  render: function () {
    var topBar = this.state.topBar ? <NavTopBar menuHandler={ this.toggleSidebar } /> : null
    var sidebar = this.state.sidebar ? <NavSideBar closeHandler={ this.toggleSidebar } /> : null

    return(
      <div id="app-component">
        { topBar }
        { sidebar }

        { this.state.page }
      </div>
    );
  }
});

module.exports = App;
