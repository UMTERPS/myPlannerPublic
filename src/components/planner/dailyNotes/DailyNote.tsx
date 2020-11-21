import React, { useState, useEffect, useContext } from 'react';
import './DailyNote.less';
import { useSelector, useDispatch } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ckeditors from 'ckeditors';
import {
  LockFilled,
  UnlockFilled,
  FullscreenOutlined
} from '@ant-design/icons';
import LayoutIds from '../../../../constants/LayoutConstants';
import { ESCAPE_KEYCODE } from '../../../../constants/GeneralConstants';
import {
  saveDailyNote,
  fetchSingleDailyNote
} from '../../../redux/actions/notesActions';
import { AppContext } from '../../../context/AppContext';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { weekMap, localeMap } from '../../../constants';

interface IDailyNoteProps {
  openModalEditor: Function;
  uid: string;
  date: Date;
}

let editors: any = {};

const DailyNote = ({ openModalEditor, uid, date }: IDailyNoteProps) => {
  const size = useSelector((state: any) => state.layout[LayoutIds.DailyNote]);
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const { locale } = useContext(AppContext);
  const { t } = useTranslation();
  let editor = editors[uid];

  useEffect(() => {
    if (editor) {
      dispatch(fetchSingleDailyNote(date)).then(content => {
        editor.setData(content || '');
      });
      if (isEditable) {
        editor.editing.view.focus();
      } else {
        setTimeout(() => {
          const checkItems = editor.sourceElement.querySelectorAll('.todo-list__label');
          checkItems.forEach(element => {
            element.querySelector('input').disabled = true;
          });
        });
      }
    }
  });

  const onInit = initeditor => {
    editors[uid] = initeditor;
    dispatch(fetchSingleDailyNote(date)).then(content => {
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
  };

  const onBlur = () => {
    dispatch(
      saveDailyNote({
        date,
        value: editor.getData()
      })
    );
    /**
     * ckeditor triggers blur event when click on checkbox,
     * so here we need to confirm if the editor element is really
     * blurred; we also need to delay the lock to prevent conflict with
     * editor's render process.
     */
    setTimeout(() => {
      if (editor.sourceElement.classList.contains('ck-blurred')) {
        lockContent();
      }
    }, 150);
  };

  const isToday = (): boolean => {
    return moment(date).isSame(new Date(), 'date');
  };

  const getNoteDateClassName = () => {
    return 'daily-note-date ' + (isEditable ? ' enabled' : ' disabled');
  };

  const getWeekendClassName = () => {
    return isWeekend() ? ' weekend' : '';
  };

  const isWeekend = (): boolean => {
    const _dayOfWeek = date.getDay();
    return _dayOfWeek === 6 || _dayOfWeek === 0;
  };

  const handleKeyDown = event => {
    if (isEditable && event.keyCode === ESCAPE_KEYCODE) {
      lockContent();
    }
  };

  const showModalEditor = event => {
    openModalEditor({
      date,
      uid,
      content: editor.getData()
    });
  };

  return (
    <div
      className="daily-note"
      style={getInlineStyle()}
      onKeyDown={handleKeyDown}
    >
      <div className={getNoteDateClassName()}>
        <div className={'row-one' + getWeekendClassName()}>
          {t(weekMap[date.getDay()])}
        </div>
        <div className="row-two">
          <div className="date-of-month">
            {date.getDate()}
            {isToday() ? (
              <div
                style={{
                  marginTop: '-0.6em',
                  fontSize: '0.3em',
                  textAlign: 'center'
                }}
              >
                {t('TODAY')}
              </div>
            ) : null}
          </div>
          <div className="lock-container">
            {isEditable ? (
              <UnlockFilled onClick={lockContent} />
            ) : (
              <LockFilled onClick={lockContent} />
            )}
          </div>
        </div>
      </div>
      <div
        className="daily-note-content-container"
        title={t('TO_EDIT')}
        onDoubleClick={lockContent}
        onBlur={onBlur}
      >
        <CKEditor
          config={{
            language: localeMap[locale]
          }}
          disabled={!isEditable}
          editor={ckeditors.EditorInlineBuild}
          onInit={onInit}
        />
        <div className="full-screen-toggle" onClick={showModalEditor}>
          <FullscreenOutlined />
        </div>
      </div>
    </div>
  );
};

export default DailyNote;
