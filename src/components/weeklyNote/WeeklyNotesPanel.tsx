import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import './WeeklyNotesPanel.less';
import LayoutConstants from '../../../constants/LayoutConstants';
import { ESCAPE_KEYCODE } from '../../../constants/GeneralConstants';
import CKEditor from '@ckeditor/ckeditor5-react';
import ckeditors from 'ckeditors';
import {
  fetchWeeklyNote,
  saveWeeklyNote
} from '../../redux/actions/notesActions';
import { bindActionCreators } from 'redux';
import { ISize } from '../../types/commonTypes';
import { AppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';

interface IWeeklyNotesPanelProps {
  date: Date;
  size: ISize;
  fetchWeeklyNote: Function;
  saveNote: Function;
}

let editor: any;

const WeeklyNotesPanel = ({
  date,
  size,
  fetchWeeklyNote,
  saveNote
}: IWeeklyNotesPanelProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { locale } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (editor) {
      fetchWeeklyNote(date).then(content => {
        editor.setData(content || '');
      });

      if (isEditable) {
        editor.editing.view.focus();
      }
    }
  });

  const onInit = initeditor => {
    editor = initeditor;
    fetchWeeklyNote(date).then(content => {
      initeditor.setData(content || '');
    });
  };

  const lockContent = () => {
    setIsEditable(!isEditable);
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

  const handleKeyDown = event => {
    if (isEditable && event.keyCode === ESCAPE_KEYCODE) {
      lockContent();
    }
  };

  return (
    <div
      className="week-note-container"
      title={t('TO_EDIT')}
      onDoubleClick={lockContent}
      onBlur={onBlur}
      style={getStyle()}
      onKeyDown={handleKeyDown}
    >
      {isEditable ? null : (
        <div className="week-note-title">
          <div>{t('WEEKLY_CALENDAR_TITLE')}</div>
        </div>
      )}
      <CKEditor
        config={{
          language: locale
        }}
        disabled={!isEditable}
        editor={ckeditors.EditorClassicBuild}
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
