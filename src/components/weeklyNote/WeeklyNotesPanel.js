import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WeeklyNotesPanel.less';
import { LayoutIds } from '../../constants/constants';
import { StyleConstants } from '../../constants/constants';
import CKEditor from '@ckeditor/ckeditor5-react';
import { EditorClassicBuild } from '../../../vendor/ckeditor5/src/ckeditor';

class WeeklyNotesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      content: '',
      editor: {}
    };
    this.onInit = this.onInit.bind(this);
    this.lockContent = this.lockContent.bind(this);
    this.getStyle = this.getStyle.bind(this);
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

  getStyle() {
    const inlineEditor = document.getElementsByClassName('ck-editor__main')[0];
    if (inlineEditor) {
      inlineEditor.style.height =
        this.props.size.height - StyleConstants.DailyNotesHeaderHeight + 'px';
    }
    return {
      width: this.props.size.width + 'px',
      height: this.props.size.height + 'px'
    };
  }

  render() {
    return (
      <div
        className="week-note-container"
        title="Double click to edit"
        onDoubleClick={this.lockContent}
        onBlur={this.lockContent}
        style={this.getStyle()}
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
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
        />
      </div>
    );
  }
}

WeeklyNotesPanel.propTypes = {
  date: PropTypes.object.isRequired,
  size: PropTypes.object
};

const mapStateToProps = state => {
  return {
    date: state.date.selectedDate,
    size: state.layout[LayoutIds.WeeklyNotesPanel]
  };
};

export default connect(mapStateToProps)(WeeklyNotesPanel);
