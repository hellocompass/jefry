var React = require('react/addons');

var TouchClick = require('../core/touch_click');
var ContactsPicker = require('../contacts/contacts_picker');
var FlashComponent = require('../shared/flash_component');

var GroupActions = require('../../actions/group_actions');
var GroupStore = require('../../stores/group_store');

var GroupForm = React.createClass({

  getInitialState: function () {
    return { errors: null }
  },

  componentWillMount: function () {
    GroupStore.addChangeListener( this._onChange );
  },

  componentWillUnmount: function () {
    GroupStore.removeChangeListener( this._onChange );
  },

  createGroup: function () {
    GroupActions.createGroup({
      name: this.refs.groupName.getDOMNode().value
    });
  },

  errorMessage: function () {
    console.log('errorMessage: ' + this.state.errors);
    if ( this.state.errors !== null ) {
      return(
        <FlashComponent messages={ this.state.errors }
                        type={ 'error' }
                        visible={ true } />
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
        { this.errorMessage() }
        <ContactsPicker error={ !!this.state.errors } />

        <TouchClick handler={ this.createGroup } className="button large submit-group">
          LETSSS GOOOOOOO
        </TouchClick>
      </form>
    )
  },

  // private

  _onChange: function () {
    this.setState({ errors: GroupStore.getErrors() });
  }
});

module.exports = GroupForm;
