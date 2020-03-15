import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WeeklyNotesPanel.less';
import LayoutConstants from '../../../constants/LayoutConstants';
import CKEditor from '@ckeditor/ckeditor5-react';
import { EditorClassicBuild } from '../../../vendor/ckeditor5/src/ckeditor';
import {
  fetchWeeklyNote,
  saveWeeklyNote
} from '../../redux/actions/notesActions';
import { bindActionCreators } from 'redux';

class WeeklyNotesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false
    };
    this.editor = null;
    this.onInit = this.onInit.bind(this);
    this.lockContent = this.lockContent.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidUpdate() {
    if (this.editor) {
      this.props.fetchWeeklyNote(this.props.date).then(content => {
        this.editor.setData(content || '');
      });
    }
  }

  onInit(editor) {
    this.editor = editor;
    this.props.fetchWeeklyNote(this.props.date).then(content => {
      this.editor.setData(content || '');
    });
  }

  lockContent() {
    const isEditable = !this.state.isEditable;
    this.setState(
      {
        isEditable
      },
      () => {
        if (this.state.isEditable) {
          this.editor.editing.view.focus();
        }
      }
    );
  }

  onBlur() {
    this.props.saveNote({
      date: this.props.date,
      value: this.editor.getData()
    });
    this.lockContent();
  }

  getStyle() {
    const inlineEditor = document.getElementsByClassName('ck-editor__main')[0];
    if (inlineEditor) {
      inlineEditor.style.height =
        this.props.size.height - LayoutConstants.DailyNotesHeaderHeight + 'px';
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
        onBlur={this.onBlur}
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
          onInit={this.onInit}
        />
      </div>
    );
  }
}

WeeklyNotesPanel.propTypes = {
  date: PropTypes.object.isRequired,
  size: PropTypes.object,
  fetchWeeklyNote: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    date: state.date.selectedDate,
    size: state.layout[LayoutConstants.WeeklyNotesPanel]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWeeklyNote: bindActionCreators(fetchWeeklyNote, dispatch),
    saveNote: bindActionCreators(saveWeeklyNote, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyNotesPanel);
