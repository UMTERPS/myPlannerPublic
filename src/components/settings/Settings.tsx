import React from 'react';
import { useTranslation } from 'react-i18next';
import './Settings.less';
import Radio, { RadioChangeEvent } from 'antd/es/radio';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateLocale } from '../../redux/actions/localeActions';
import LayoutConstants from '../../../constants/LayoutConstants.js';

const Settings = ({ locale, size, updateLocale }) => {
  const { t } = useTranslation();
  const updateLocaleSettings = (event: RadioChangeEvent) => {
    updateLocale({ locale: event.target.value });
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

const mapStateToProps: any = (state: any) => {
  return {
    locale: state.locale.locale,
    size: state.layout[LayoutConstants.Settings]
  };
};

const mapDispatchToProps: any = (dispatch: any) => {
  return {
    updateLocale: bindActionCreators(updateLocale, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
