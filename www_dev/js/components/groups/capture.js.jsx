var React = require('react/addons');

var ContentStore = require('../../stores/content_store');
var ContentActions = require('../../actions/content_actions');
var UserActions = require('../../actions/user_actions');
var UserStore = require('../../stores/user_store');
var TagPicker = require('./tag_picker');

var Capture = React.createClass({

  getInitialState: function () {
    return {
      members: UserStore.getGroupUsers( this.props.group.id ),
      content: ContentStore.newContent({ group_id: this.props.group.id })
    };
  },

  componentDidMount: function () {
    ContentStore.addChangeListener( this._onChange );

    navigator.camera.getPicture(
      this.imageCaptured,
      this.captureFailed,
      {
        quality: 45,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true
      }
    );
  },

  componentWillUnmount: function () {
    ContentStore.removeChangeListener( this._onChange );
  },

  imageCaptured: function ( imageData ) {
    console.log( 'imageCaptured' );
    console.log( imageData );
    this.refs.component.getDOMNode().style.backgroundImage = "url('" + imageData + "')";
    this.refs.form.getDOMNode().className = "";
  },

  captureFailed: function ( response ) {
    console.log(response);
  },

  createContent: function () {
    // stub
  },

  render: function () {
    return(
      <div ref="component" className="capture-component">
        <form ref="form" className="hidden" onSubmit={ this.createContent() }>
          <h4>Wow, that's fucked up</h4>

          <div class="form-inner-wrapper">
            <input type="file" name="content[image]" id="content_image" className="hidden" />
            <input type="file" name="content[group_id]" id="content_group_id"
                   className="hidden" value={ this.props.group.id } />
            <input type="file" name="content[user_ids]" id="content_user_ids" className="hidden" />

            <div className="form-input-fields">
              <label for="caption">Caption:</label>
              <input type="text" name="content[caption]" id="content_caption" placeholder="Type something here" />
            </div>

            <TagPicker members={ this.state.members } content={ this.state.content } />
          </div>

          <input type="submit" className="button large" value="Finish" />
        </form>
      </div>
    );
  },

  _onChange: function () {
    this.setState({
      content: ContentStore.getPendingContent()
    });
  }
});

module.exports = Capture;
