import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './WeeklyNotesPanel.less';
import LayoutIds from '../../../constants/LayoutContants';
import StyleConstants from '../../../constants/StyleContants';
import CKEditor from '@ckeditor/ckeditor5-react';
import { EditorClassicBuild } from '../../../vendor/ckeditor5/src/ckeditor';
import moment from 'moment';
import {
  fetchWeeklyNote,
  saveWeeklyNote
} from '../../redux/actions/notesActions';
import { bindActionCreators } from 'redux';
import { getMondayOfWeek, generateUwid } from '../../services/DateUtilService';

class WeeklyNotesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      content: '',
      editor: {}
    };
    this.editor = null;
    this.onInit = this.onInit.bind(this);
    this.lockContent = this.lockContent.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (!moment(nextProps.date).isSame(this.props.date)) {
      this.props.fetchWeeklyNote(nextProps.date);
    }
    if (this.editor && !this.state.isEditable) {
      const _content =
        nextProps.contents[generateUwid(getMondayOfWeek(nextProps.date))];
      this.editor.setData(_content || '');
    }
    return true;
  }

  componentDidMount() {
    this.props.fetchWeeklyNote(this.props.date);
  }

  onInit(editor) {
    this.editor = editor;
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
          data={this.state.content}
          onInit={this.onInit}
        />
      </div>
    );
  }
}

WeeklyNotesPanel.propTypes = {
  date: PropTypes.object.isRequired,
  size: PropTypes.object,
  contents: PropTypes.object,
  fetchWeeklyNote: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    date: state.date.selectedDate,
    size: state.layout[LayoutIds.WeeklyNotesPanel],
    contents: state.notes.contents
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWeeklyNote: bindActionCreators(fetchWeeklyNote, dispatch),
    saveNote: bindActionCreators(saveWeeklyNote, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeeklyNotesPanel);
