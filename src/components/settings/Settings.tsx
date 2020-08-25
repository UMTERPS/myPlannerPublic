import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './Settings.less';
import Radio, { RadioChangeEvent } from 'antd/es/radio';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocale, updateTheme } from '../../redux/actions/settingsActions';
import LayoutConstants from '../../../constants/LayoutConstants.js';
import { AppContext } from '../../context/AppContext';

const Settings = () => {
  const locale = useContext(AppContext).locale;
  const theme = useSelector((state: any) => state.settings.theme);
  const size = useSelector(
    (state: any) => state.layout[LayoutConstants.Settings]
  );
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();

  const updateLocaleSettings = (event: RadioChangeEvent) => {
    dispatch(updateLocale(event.target.value));
    if (event.target.value !== locale) {
      setShowConfirm(true);
    }
  };

  const updateThemeSettings = (event: RadioChangeEvent) => {
    dispatch(updateTheme(event.target.value));
  };

  const reloadApp = () => {
    window.location.reload();
  };
  const handleCancel = () => {
    setShowConfirm(false);
  };
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
      <div className="settings-content">
        <h4>{t('THEME_SETTING_TITLE')}</h4>
        <hr />
        <Radio.Group onChange={updateThemeSettings} defaultValue={theme}>
          <Radio value={''}>{t('THEME_DARK')}</Radio>
          <Radio value={'light'}>{t('THEME_LIGHT')}</Radio>
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
