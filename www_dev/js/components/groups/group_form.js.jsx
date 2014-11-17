var React = require('react/addons');

var TouchClick = require('../core/touch_click');
var Contact = require('../contacts/contact');

var ContactStore = require('../../stores/contact_store');
var ContactActions = require('../../actions/contact_actions');
var GroupActions = require('../../actions/group_actions');

var GroupForm = React.createClass({

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

  createGroup: function () {
    GroupActions.createGroup({
      name: this.refs.groupName.getDOMNode().value
    });
  },

  render: function () {
    var contacts;

    if ( this.state.contacts.length > 0 ) {
      contacts = this.state.contacts.map( function ( contact ) {
        return ( <Contact key={ contact.id }
                          contact={ contact }
                          active={ contact.active } /> );
      })
    } else {
      contacts = [
        <li className="no-contacts">+ invite friends</li>
      ]
    }

    return(
      <form id="group-form-component">
        <input ref="groupName" type="text" placeholder="Name this BlackIn" />

        <p className="contacts-label">Who do you want to BlackIn with?</p>
        <ul id="contacts-picker">
          { contacts }
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
      contacts: ContactStore.contactsList()
    });
  }
});

module.exports = GroupForm;
