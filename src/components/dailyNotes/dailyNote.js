import React from 'react';
import PropTypes from 'prop-types';
import './dailyNote.less';
import CKEditor from '@ckeditor/ckeditor5-react';
import InlineEditor from '../../../vendor/ckeditor5';
import { FaLock, FaLockOpen } from 'react-icons/fa';

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
      editor: {},
      content: props.content || '',
      isEditable: false,
      noteDateClass: 'daily-note-date disabled'
    };
    this.lockContent = this.lockContent.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onInit = this.onInit.bind(this);
  }

  handleEditorChange = content => {
    console.log('Content was updated:', content);
  };

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
          this.state.editor.editing.view.focus();
        }
      }
    );
  }

  onInit(editor) {
    this.setState({ editor });
  }

  onBlur() {
    this.lockContent();
  }

  setNoteDateClassName() {
    return 'daily-note-date' + (this.isEditable ? ' enabled' : ' disabled');
  }

  render() {
    return (
      <div
        className={
          'daily-note' +
          (this.props.dailyClassName ? ' ' + this.props.dailyClassName : '')
        }
      >
        <div className={this.state.noteDateClass}>
          <div className='row-one'>{weekMap[this.props.date.getDay()]}</div>
          <div className='row-two'>
            <div className='date-of-month'>{this.props.date.getDate()}</div>
            <div className='lock-container'>
              {this.state.isEditable ? (
                <FaLockOpen onClick={this.lockContent} />
              ) : (
                <FaLock onClick={this.lockContent} />
              )}
            </div>
          </div>
        </div>
        <div
          className='daily-note-content-container'
          title='Double click to edit'
          onDoubleClick={this.lockContent}
          onBlur={this.onBlur}
        >
          <CKEditor
            disabled={!this.state.isEditable}
            editor={InlineEditor}
            data={this.state.content}
            onInit={this.onInit}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
          />
        </div>
      </div>
    );
  }
}

DailyNote.propTypes = {
  content: PropTypes.string,
  dailyClassName: PropTypes.string,
  date: PropTypes.object.isRequired
};

export default DailyNote;
