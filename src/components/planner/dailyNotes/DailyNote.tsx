import React, { useState, useEffect, useContext } from 'react';
import './DailyNote.less';
import { useSelector, useDispatch } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ckeditors from 'ckeditors';
import { LockFilled, UnlockFilled } from '@ant-design/icons';
import LayoutIds from '../../../../constants/LayoutConstants';
import { ESCAPE_KEYCODE } from '../../../../constants/GeneralConstants';
import {
  saveDailyNote,
  fetchSingleDailyNote
} from '../../../redux/actions/notesActions';
import { AppContext } from '../../../context/AppContext';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const weekMap = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY'
];

const localeMap = {
  'en-US': 'en',
  'zh-CN': 'zh-cn',
  zh: 'zh-cn'
};

interface IDailyNoteProps {
  uid: string;
  date: Date;
}

let editors: any = {};

const DailyNote = ({ uid, date }: IDailyNoteProps) => {
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
    lockContent();
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
      </div>
    </div>
  );
};

export default DailyNote;
