var React = require('react/addons');

var TouchClick = require('../core/touch_click');
var Contact = require('./contact');
var RequestContacts = require('./request_contacts');

var ContactStore = require('../../stores/contact_store');
var ContactActions = require('../../actions/contact_actions');

var ContactsPicker = React.createClass({

  getInitialState: function () {
    return { contacts: ContactStore.contactsList() };
  },

  componentDidMount: function () {
    ContactStore.addChangeListener( this._onChange );
    ContactActions.getAll();
  },

  componentWillUnmount: function () {
    ContactStore.removeChangeListener( this._onChange );
  },

  contacts: function () {
    if ( this.state.contacts.length > 0 ) {
      return this.state.contacts.map( function ( contact ) {
        return ( <Contact key={ contact.id }
                          contact={ contact }
                          active={ contact.active } /> );
      });
    } else {
      return [<RequestContacts />];
    }
  },

  render: function () {
    return(
      <ul class="contacts-picker-component" id="contacts-picker">
        { this.contacts() }
      </ul>
    );
  },

  // private

  _onChange: function () {
    this.setState({
      contacts: ContactStore.contactsList()
    });
  }
})

module.exports = ContactsPicker;
