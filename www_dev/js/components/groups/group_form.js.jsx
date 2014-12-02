var React = require('react/addons');

var FlashComponent = require('../shared/flash_component');
var TouchClick = require('../core/touch_click');
var Contact = require('../contacts/contact');
var RequestContacts = require('../contacts/request_contacts');

var ContactStore = require('../../stores/contact_store');
var ContactActions = require('../../actions/contact_actions');
var GroupActions = require('../../actions/group_actions');
var GroupStore = require('../../stores/group_store');

var GroupForm = React.createClass({

  getInitialState: function () {
    return {
      errors: null,
      contacts: ContactStore.contactsList()
    };
  },

  componentDidMount: function () {
    ContactStore.addChangeListener( this._onChange );
    GroupStore.addChangeListener( this._onChange );
    ContactActions.getAll();
  },

  componentWillUnmount: function () {
    ContactStore.removeChangeListener( this._onChange );
    GroupStore.removeChangeListener( this._onChange );
  },

  createGroup: function () {
    GroupActions.createGroup({
      name: this.refs.groupName.getDOMNode().value
    });
  },

  contactListItems: function () {
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

  errorMessage: function () {
    if ( this.state.errors !== null ) {
      return(
        <li className="flash-list-item">
          <FlashComponent messages={ this.state.errors }
                          type={ 'error' }
                          visible={ true } />
        </li>
      )
    } else {
      return null;
    }
  },

  render: function () {
    return(
      <form id="group-form-component">
        <input ref="groupName" type="text" placeholder="Name this BlackIn" />

        <p className="contacts-label">Who do you want to BlackIn with?</p>
        <ul id="contacts-picker">
          { this.errorMessage() }
          { this.contactListItems() }
        </ul>

        <TouchClick handler={ this.createGroup } className="button large submit-group">
          LETSSS GOOOOOOO
        </TouchClick>
      </form>
    )
  },

  // private

  _onChange: function () {
    this.setState({
      errors: GroupStore.getErrors(),
      contacts: ContactStore.contactsList()
    });
  }
});

module.exports = GroupForm;
