import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './WeeklyNotesPanel.less';
import LayoutConstants from '../../../../constants/LayoutConstants';
import { ESCAPE_KEYCODE } from '../../../../constants/GeneralConstants';
import CKEditor from '@ckeditor/ckeditor5-react';
import ckeditors from 'ckeditors';
import {
  fetchWeeklyNote,
  saveWeeklyNote
} from '../../../redux/actions/notesActions';
import { AppContext } from '../../../context/AppContext';
import { useTranslation } from 'react-i18next';

const localeMap = {
  'en-US': 'en',
  'zh-CN': 'zh-cn',
  zh: 'zh-cn'
};

let editor: any;

const WeeklyNotesPanel = () => {
  const date = useSelector((state: any) => state.date.selectedDate);
  const size = useSelector(
    (state: any) => state.layout[LayoutConstants.WeeklyNotesPanel]
  );
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const { locale } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (editor) {
      dispatch(fetchWeeklyNote(date)).then(content => {
        editor.setData(content || '');
      });

      if (isEditable) {
        editor.editing.view.focus();
      } else {
        setTimeout(() => {
          const checkItems = editor.sourceElement.nextElementSibling.querySelectorAll('.todo-list__label');
          checkItems.forEach(element => {
            element.querySelector('input').disabled = true;
          });
        });
      }
    }
  });

  const onInit = initeditor => {
    editor = initeditor;
    dispatch(fetchWeeklyNote(date)).then(content => {
      initeditor.setData(content || '');
    });
  };

  const lockContent = () => {
    setIsEditable(!isEditable);
  };

  const onBlur = () => {
    dispatch(
      saveWeeklyNote({
        date,
        value: editor.getData()
      })
    );
    setTimeout(() => {
      const contentElement = editor.sourceElement.nextElementSibling.querySelector('.ck-editor__editable');
      if (contentElement.classList.contains('ck-blurred')) {
        lockContent();
      }
    }, 150);
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
          language: localeMap[locale]
        }}
        disabled={!isEditable}
        editor={ckeditors.EditorClassicBuild}
        onInit={onInit}
      />
    </div>
  );
};

export default WeeklyNotesPanel;
