var React = require('react/addons');

var TouchClick = require('../core/touch_click');

var TaggableUser = React.createClass({

  getInitialState: function () {
    return { active: false };
  },

  toggleSelected: function () {

  },

  getClass: function () {
    return 'selectable taggable-user-component' + ( this.state.active ? ' active' : '' );
  },

  render: function () {
    return(
      <TouchClick handler={ this.toggleSelected }
                  nodeName="li"
                  className={ this.getClass() }
                  id={ 'taggable-user-component-' + this.props.key }>
        <div className="inner-wrapper flexible">
          <div className="image-box">
            <div className="image-wrapper">
              <img src="../img/logo.png" height="50" width="50" />
            </div>
          </div>

          <p className="name">
            { this.props.user.username }
          </p>

          <p className="toggle-state">
            <span className="icon"></span>
          </p>
        </div>
      </TouchClick>
    );
  }
});

module.exports = TaggableUser;
