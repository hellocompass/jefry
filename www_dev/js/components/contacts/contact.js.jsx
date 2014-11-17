var React = require('react/addons');
var TouchClick = require('../core/touch_click');

var ContactActions = require('../../actions/contact_actions');

var Contact = React.createClass({

  getInitialState: function () {
    return { active: false };
  },

  componentWillReceiveProps: function ( props ) {
    this.setState({ active: props.active });
  },

  toggleSelected: function () {
    ContactActions.toggleActive( this.props.contact.id );
  },

  getClass: function () {
    return 'contact-component' + ( this.state.active ? ' active' : '' );
  },

  render: function () {
    return(
      <TouchClick handler={ this.toggleSelected }
                  nodeName="li"
                  className={ this.getClass() }
                  id={ 'contact-component-' + this.props.key }>
        <div className="contact-inner-wrapper flexible">
          <div className="image-box">
            <div className="image-wrapper">
              <img src="../img/logo.png" height="50" width="50" />
            </div>
          </div>

          <p className="name">
            { this.props.contact.name.formatted }
          </p>

          <p className="contact-toggle-state">
            <span className="icon"></span>
          </p>
        </div>
      </TouchClick>
    );
  }
});

module.exports = Contact;
