import React, { useEffect, useState } from 'react';
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

interface WeeklyNotesPanelProps {
  date: Date;
  size: {
    height: number;
    width: number;
  };
  fetchWeeklyNote: Function;
  saveNote: Function;
}

let editor;

const WeeklyNotesPanel = ({
  date,
  size,
  fetchWeeklyNote,
  saveNote
}: WeeklyNotesPanelProps) => {
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (editor) {
      fetchWeeklyNote(date).then(content => {
        editor.setData(content || '');
      });
    }
  });

  useEffect(() => {
    if (isEditable) {
      editor.editing.view.focus();
    }
  }, [editor]);

  const onInit = initeditor => {
    editor = initeditor;
    fetchWeeklyNote(date).then(content => {
      editor.setData(content || '');
    });
  };

  const lockContent = () => {
    const _isEditable = !isEditable;
    setIsEditable(_isEditable);
  };

  const onBlur = () => {
    saveNote({
      date,
      value: editor.getData()
    });
    lockContent();
  };

  const getStyle = () => {
    const inlineEditor: HTMLDivElement = document.getElementsByClassName(
      'ck-editor__main'
    )[0] as HTMLDivElement;
    if (inlineEditor) {
      inlineEditor.style.height =
        size.height - LayoutConstants.DailyNotesHeaderHeight + 'px';
    }
    return {
      width: size.width + 'px',
      height: size.height + 'px'
    };
  };

  return (
    <div
      className="week-note-container"
      title="Double click to edit"
      onDoubleClick={lockContent}
      onBlur={onBlur}
      style={getStyle()}
    >
      {isEditable ? null : (
        <div className="week-note-title">
          <div>Notes of the Week</div>
        </div>
      )}
      <CKEditor
        disabled={!isEditable}
        editor={EditorClassicBuild}
        onInit={onInit}
      />
    </div>
  );
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
