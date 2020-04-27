import React, { useState, useEffect, useContext } from 'react';
import './DailyNote.less';
import { connect } from 'react-redux';
import CKEditor from '@ckeditor/ckeditor5-react';
import ckeditors from 'ckeditors';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import LayoutIds from '../../../constants/LayoutConstants';
import { ESCAPE_KEYCODE } from '../../../constants/GeneralConstants';
import {
  saveDailyNote,
  fetchSingleDailyNote
} from '../../redux/actions/notesActions';
import { bindActionCreators } from 'redux';
import { ISize } from '../../types/commonTypes';
import { AppContext } from '../../context/AppContext';
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
  const { locale } = useContext(AppContext);
  const { t } = useTranslation();
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

  const isToday = (): boolean => {
    return moment(date).isSame(new Date(), 'date');
  };

  const getNoteDateClassName = () => {
    return (
      'daily-note-date' +
      (isEditable ? ' enabled' : ' disabled') +
      (isWeekend() ? ' today' : '')
    );
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
        <div className="row-one">{t(weekMap[date.getDay()])}</div>
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
              <FaLockOpen onClick={lockContent} />
            ) : (
              <FaLock onClick={lockContent} />
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
            language: locale
          }}
          disabled={!isEditable}
          editor={ckeditors.EditorInlineBuild}
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
