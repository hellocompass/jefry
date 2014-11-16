var React = require('react/addons');
var TouchClick = require('../touch_click');

var NavTopBar = React.createClass({

  defaults: {
    title: null
  },

  getInitialState: function () {
    return this.defaults;
  },

  componentWillReceiveProps: function ( props ) {
    this.setState({
      title: props.title
    });
  },

  render: function () {
    var title;
    if ( !!this.state.title ) {
      title = this.state.title;
    } else {
      title = <div><span className="thin">BLACK</span> IN</div>;
    }

    return(
      <header id="nav-top-bar-component">
        <h4>
          <TouchClick className="ion-navicon" nodeName="i"
            handler={ this.props.menuHandler } />
          { title }
        </h4>
      </header>
    )
  }
});

module.exports = NavTopBar;
