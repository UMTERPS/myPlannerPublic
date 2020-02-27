import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WeekNote.less';
import CKEditor from '@ckeditor/ckeditor5-react';
import { EditorClassicBuild } from '../../../vendor/ckeditor5/src/ckeditor';
// const electron = require('electron');
// const { ipcRenderer: ipc } = electron;

class WeekNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      content: '',
      editor: {}
    };
    this.data = '';
    this.onInit = this.onInit.bind(this);
    this.lockContent = this.lockContent.bind(this);
    this.getContainerHeight = this.getContainerHeight.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onInit = editor => {
    this.setState({ editor });
  };

  lockContent() {
    const isEditable = !this.state.isEditable;
    this.setState(
      {
        isEditable
      },
      () => {
        if (this.state.isEditable) {
          this.state.editor.editing.view.focus();
        }
      }
    );
  }

  getContainerHeight() {
    const inlineEditor = document.getElementsByClassName('ck-editor__main')[0];
    if (inlineEditor) {
      inlineEditor.style.height = this.props.size.height - 40 + 'px';
    }
    return {
      height: this.props.size.height + 'px'
    };
  }

  onBlur() {
    console.log(this.data);
    // ipc.send('ping', {
    //   key: '/weekly/dummyKey',
    //   value: this.data
    // });
    this.lockContent();
  }

  onChange(event, editor) {
    this.data = editor.getData();
    // console.log(this.data);
  }

  render() {
    return (
      <div
        className="week-note-container"
        title="Double click to edit"
        onDoubleClick={this.lockContent}
        onBlur={this.onBlur}
        style={this.getContainerHeight()}
      >
        {this.state.isEditable ? null : (
          <div className="week-note-title">
            <div>Notes of the Week</div>
          </div>
        )}
        <CKEditor
          disabled={!this.state.isEditable}
          editor={EditorClassicBuild}
          data={this.state.content}
          onInit={this.onInit}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

WeekNote.propTypes = {
  date: PropTypes.object.isRequired,
  size: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    date: state.date.selectedDate
  };
};

export default connect(mapStateToProps)(WeekNote);
