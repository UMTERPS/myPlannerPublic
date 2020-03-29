import React, { useState, useEffect } from 'react';
import './DailyNote.less';
import { connect } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import { EditorInlineBuild } from '../../../vendor/ckeditor5/src/ckeditor';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import LayoutIds from '../../../constants/LayoutConstants';
import {
  saveDailyNote,
  fetchSingleDailyNote
} from '../../redux/actions/notesActions';
import { bindActionCreators } from 'redux';
import { ISize } from '../../types/commonTypes';
const weekMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

interface IDailyNoteProps {
  uid: string;
  date: Date;
  saveNote: Function;
  fetchSingleDailyNote: Function;
  size: ISize;
}

let editors: any = {};

const DailyNote = ({
  uid,
  date,
  saveNote,
  fetchSingleDailyNote,
  size
}: IDailyNoteProps) => {
  const [isEditable, setIsEditable] = useState(false);
  let editor = editors[uid];
  useEffect(() => {
    if (editor) {
      fetchSingleDailyNote(date).then(content => {
        editor.setData(content || '');
      });
      if (isEditable) {
        editor.editing.view.focus();
      }
    }
  });

  const onInit = initeditor => {
    editors[uid] = initeditor;
    fetchSingleDailyNote(date).then(content => {
      initeditor.setData(content || '');
    });
  };

  const getInlineStyle = () => {
    return {
      height: size.height + 'px'
    };
  };

  const lockContent = () => {
    setIsEditable(!isEditable);
    // setNoteDateClass(
    //   'daily-note-date' + (isEditable ? ' enabled' : ' disabled')
    // );
  };

  const onBlur = () => {
    saveNote({
      date,
      value: editor.getData()
    });
    lockContent();
  };

  const getNoteDateClassName = () => {
    return 'daily-note-date' + (isEditable ? ' enabled' : ' disabled');
  };

  return (
    <div className="daily-note" style={getInlineStyle()}>
      <div className={getNoteDateClassName()}>
        <div className="row-one">{weekMap[date.getDay()]}</div>
        <div className="row-two">
          <div className="date-of-month">{date.getDate()}</div>
          <div className="lock-container">
            {isEditable ? (
              <FaLockOpen onClick={lockContent} />
            ) : (
              <FaLock onClick={lockContent} />
            )}
          </div>
        </div>
      </div>
      <div
        className="daily-note-content-container"
        title="Double click to edit"
        onDoubleClick={lockContent}
        onBlur={onBlur}
      >
        <CKEditor
          disabled={!isEditable}
          editor={EditorInlineBuild}
          onInit={onInit}
        />
      </div>
    </div>
  );
};

const mapStateToProps: any = (state: any) => {
  return {
    size: state.layout[LayoutIds.DailyNote]
  };
};

const mapDispatchToProps: any = (dispatch: any) => {
  return {
    saveNote: bindActionCreators(saveDailyNote, dispatch),
    fetchSingleDailyNote: bindActionCreators(fetchSingleDailyNote, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyNote);
