import React from 'react';
import { render } from 'react-dom';
import './index.less';
import App from './components/App';
import { Provider as ReduxProvider } from 'react-redux';
import LayoutProvider, { initLayout } from './providers/LayoutProvider';
import { initState } from './redux/reducers/initState';
import { AppContext } from './context/AppContext';
import {
  initI18n,
  getSettings,
  updateSettings
} from './services/SettingsService';

const storeConfig = () => {
  return process.env.NODE_ENV === 'production'
    ? import('./redux/configureStore.prod')
    : import('./redux/configureStore.dev');
};

const init = async () => {
  let { locale, theme } = await getSettings();
  if (!locale) {
    // get locale info from electron renderer browser navigator
    locale = window.navigator.language;
    // send locale info back to electron main process to save it into preferences
    await updateSettings({ locale });
  }
  // init i18next with the locale string
  initI18n(locale);

  return { locale, theme };
};

init().then(settings => {
  initState.layout = initLayout();
  initState.settings = settings;

  storeConfig().then(storeConfig => {
    const configureStore = storeConfig.default;
    render(
      <ReduxProvider store={configureStore(initState)}>
        <AppContext.Provider value={{ locale: settings.locale }}>
          <LayoutProvider />
          <App />
        </AppContext.Provider>
      </ReduxProvider>,
      document.getElementById('app')
    );
  });
});
