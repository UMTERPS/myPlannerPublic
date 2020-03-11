import React from 'react';
import PropTypes from 'prop-types';
import './DailyNote.less';
import { connect } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import { EditorInlineBuild } from '../../../vendor/ckeditor5/src/ckeditor';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import LayoutIds from '../../../constants/LayoutContants';
import { saveDailyNote } from '../../redux/actions/notesActions';
import { bindActionCreators } from 'redux';
import DailyNotesHeaderHeight from '../../../constants/StyleContants';
const weekMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

class DailyNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
      noteDateClass: 'daily-note-date disabled'
    };
    this.editor = null;
    this.lockContent = this.lockContent.bind(this);
    this.getInlineStyle = this.getInlineStyle.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onInit = this.onInit.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.editor && !this.state.isEditable) {
      this.editor.setData(nextProps.content || '');
    }
    return true;
  }

  getInlineStyle() {
    return {
      height: this.props.size.height + 'px'
    };
  }

  lockContent() {
    const isEditable = !this.state.isEditable;
    this.setState(
      {
        isEditable,
        noteDateClass:
          'daily-note-date' + (isEditable ? ' enabled' : ' disabled')
      },
      () => {
        if (this.state.isEditable) {
          this.editor.editing.view.focus();
        }
      }
    );
  }

  onInit(editor) {
    this.editor = editor;
  }

  onBlur() {
    this.props.saveNote({
      date: this.props.date,
      value: this.editor.getData()
    });
    this.lockContent();
  }

  setNoteDateClassName() {
    return 'daily-note-date' + (this.isEditable ? ' enabled' : ' disabled');
  }

  render() {
    return (
      <div className="daily-note" style={this.getInlineStyle()}>
        <div className={this.state.noteDateClass}>
          <div className="row-one">{weekMap[this.props.date.getDay()]}</div>
          <div className="row-two">
            <div className="date-of-month">{this.props.date.getDate()}</div>
            <div className="lock-container">
              {this.state.isEditable ? (
                <FaLockOpen onClick={this.lockContent} />
              ) : (
                <FaLock onClick={this.lockContent} />
              )}
            </div>
          </div>
        </div>
        <div
          className="daily-note-content-container"
          title="Double click to edit"
          onDoubleClick={this.lockContent}
          onBlur={this.onBlur}
        >
          <CKEditor
            config={{
              toolbar: {
                viewportTopOffset: DailyNotesHeaderHeight
              }
            }}
            disabled={!this.state.isEditable}
            editor={EditorInlineBuild}
            onInit={this.onInit}
          />
        </div>
      </div>
    );
  }
}

DailyNote.propTypes = {
  content: PropTypes.string,
  udid: PropTypes.string,
  date: PropTypes.object.isRequired,
  saveNote: PropTypes.func.isRequired,
  size: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    size: state.layout[LayoutIds.DailyNote]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveNote: bindActionCreators(saveDailyNote, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyNote);
