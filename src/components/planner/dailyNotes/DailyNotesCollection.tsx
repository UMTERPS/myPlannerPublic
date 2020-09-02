import React, { ReactNode, useState, useContext } from 'react';
import DailyNote from './DailyNote';
import './DailyNotesCollection.less';
import { useSelector, useDispatch } from 'react-redux';
import LayoutIds from '../../../../constants/LayoutConstants';
import CKEditor from '@ckeditor/ckeditor5-react';
import ckeditors from 'ckeditors';
import { getDailyData } from '../../../services/DateUtilService';
import Modal from 'antd/es/modal';
import { AppContext } from '../../../context/AppContext';
import { useTranslation } from 'react-i18next';
import { saveDailyNote } from '../../../redux/actions/notesActions';
import { localeMap, weekMap, monthMap } from '../../../constants';

interface IModalEditorData {
  content: string;
  uid: string;
  date: Date;
}

let modalEditorData: IModalEditorData;
let modalEditor: any;
const DailyNotesCollection = () => {
  const date = useSelector((state: any) => state.date.selectedDate);
  const size = useSelector((state: any) => state.layout[LayoutIds.LayoutRoot]);
  const [showModalEditor, setShowModalEditor] = useState(false);
  const { locale } = useContext(AppContext);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getStyle = () => {
    return {
      height: size.height * 0.8 + 'px'
    };
  };

  const onInit = initeditor => {
    modalEditor = initeditor;
    modalEditor.setData(modalEditorData.content || '');
  };

  const closeModalEditor = () => {
    dispatch(
      saveDailyNote({
        date: modalEditorData.date,
        value: modalEditor.getData()
      })
    );
    setShowModalEditor(false);
  };

  const openModalEditor = (data: IModalEditorData) => {
    modalEditorData = data;
    if (modalEditor) {
      modalEditor.setData(data.content || '');
    }
    setShowModalEditor(true);
  };

  const generateModalTitle = () => {
    if (modalEditorData) {
      const _date = modalEditorData.date as Date;
      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {t('DATE_TITLE', {
              year: _date.getFullYear(),
              month: t(monthMap[_date.getMonth()]),
              date: _date.getDate(),
              numOfMonth: _date.getMonth() + 1
            })}
          </div>
          <div>{t(weekMap[_date.getDay()])}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  const generateDailys = () => {
    const days = getDailyData(date);
    const dailys: ReactNode[] = [];
    days.slice(0, 5).forEach((day, index) => {
      dailys.push(
        <div key={index}>
          <DailyNote
            openModalEditor={openModalEditor}
            date={day.date}
            uid={index.toString()}
          />
        </div>
      );
    });

    dailys.push(
      <div key="weekend-key" className="weekend-row">
        <div key={5} className="column-one">
          <DailyNote
            openModalEditor={openModalEditor}
            date={days[5].date}
            uid={'5'}
          />
        </div>
        <div key={6} className="column-two">
          <DailyNote
            openModalEditor={openModalEditor}
            date={days[6].date}
            uid={'6'}
          />
        </div>
      </div>
    );

    return dailys;
  };

  return (
    <div className="daily-collection">
      <div>{generateDailys()}</div>
      <Modal
        title={generateModalTitle()}
        width="80%"
        visible={showModalEditor}
        centered
        closable={false}
        maskClosable={true}
        onCancel={closeModalEditor}
        footer={null}
      >
        <div className="modal-editor-container" style={getStyle()}>
          <CKEditor
            config={{
              language: localeMap[locale]
            }}
            disabled={false}
            editor={ckeditors.EditorClassicBuild}
            onInit={onInit}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DailyNotesCollection;
