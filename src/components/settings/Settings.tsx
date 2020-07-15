import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './Settings.less';
import Radio, { RadioChangeEvent } from 'antd/es/radio';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocale } from '../../redux/actions/localeActions';
import LayoutConstants from '../../../constants/LayoutConstants.js';
import { AppContext } from '../../context/AppContext';

const Settings = () => {
  const locale = useContext(AppContext).locale;
  const size = useSelector((state: any) => state.layout[LayoutConstants.Settings]);
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();
  const updateLocaleSettings = (event: RadioChangeEvent) => {
    dispatch(updateLocale({ locale: event.target.value }));
    if (event.target.value !== locale) {
      setShowConfirm(true);
    }
  };
  const reloadApp = () => {
    window.location.reload();
  }
  const handleCancel = () => {
    setShowConfirm(false);
  }
  return (
    <div
      className="settings-container"
      style={{ height: size.height + 'px', width: size.width + 'px' }}
    >
      <div className="settings-content">
        <h4>{t('LANGUAGES')}</h4>
        <hr />
        <Radio.Group onChange={updateLocaleSettings} defaultValue={locale}>
          <Radio value={'en-US'}>{t('ENGLISH')}</Radio>
          <Radio value={'zh-CN'}>{t('CHINESE')}</Radio>
        </Radio.Group>
      </div>
      <Modal
        title={t('RELOAD_APP')}
        visible={showConfirm}
        onOk={reloadApp}
        onCancel={handleCancel}
        okText={t('RELOAD_NOW')}
        cancelText={t('RELOAD_LATER')}
      ></Modal>
    </div>
  );
};

export default Settings;
