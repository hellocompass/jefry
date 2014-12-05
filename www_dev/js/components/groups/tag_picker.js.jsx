var React = require('react/addons');

var TaggableUser = require('../users/taggable_user');

var TagPicker = React.createClass({

  getInitialState: function () {
    return {
      content: this.props.content
    }
  },

  componentWillReceiveProps: function ( props ) {
    this.setState({
      content: props.content
    })
  },

  taggableMembers: function () {
    var _this = this;

    return this.props.members.map( function ( member ) {
      return(
        <TaggableUser key={ member.id }
                 user={ member }
                 action={ _this.state.content.user_ids.indexOf( member.id ) > -1 } />
      )
    });
  },

  render: function () {
    return(
      <ul className="tag-picker-component">
        { this.taggableMembers() }
      </ul>
    );
  },

  // private

  _onChange: function () {
    this.setState({
      content: ContentStore.getPendingContent()
    })
  }
});

module.exports = TagPicker;
