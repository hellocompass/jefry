var React = require('react/addons');

var TouchClick = require('../core/touch_click');

var ContactStore = require('../../stores/contact_store');
var ContactActions = require('../../actions/contact_actions');

var RequestContacts = React.createClass({

  getContacts: function () {
    return ContactActions.getAll();
  },

  render: function () {
    return(
      <TouchClick handler={ this.getContacts } className="request-contacts-component" nodeName="li">
        <p>
          Whoops! BlackIn lets you invite friends from your contacts, but we
          need permission. Give BlackIn permission in&nbsp;
          <strong>Settings > Privacy > Contacts</strong>.
        </p>
        <i className="ion-ios7-plus-outline"></i>
        <br />
        invite friends
      </TouchClick>
    )
  }
});

module.exports = RequestContacts;
