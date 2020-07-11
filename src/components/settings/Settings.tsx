import React from 'react';
import { useTranslation } from 'react-i18next';
import './Settings.less';
import Radio, { RadioChangeEvent } from 'antd/es/radio';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocale } from '../../redux/actions/localeActions';
import LayoutConstants from '../../../constants/LayoutConstants.js';

const Settings = () => {
  const locale = useSelector((state: any) => state.locale.locale);
  const size = useSelector((state: any) => state.layout[LayoutConstants.Settings]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const updateLocaleSettings = (event: RadioChangeEvent) => {
    dispatch(updateLocale({ locale: event.target.value }));
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
    </div>
  );
};

export default Settings;
