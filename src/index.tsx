import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.less';
import App from './components/App';
import { Provider as ReduxProvider } from 'react-redux';
import LayoutProvider, { initLayout } from './providers/LayoutProvider';
import { initState } from './redux/reducers/initState';
import { AppContext } from './context/AppContext';
import initI18n, { getLocale } from './services/LocaleService';

const storeConfig = () => {
  return process.env.NODE_ENV === 'production'
    ? import('./redux/configureStore.prod')
    : import('./redux/configureStore.dev');
};

initState.layout = initLayout();

getLocale().then(locale => {
  // locale = 'zh-cn';
  initI18n(locale);
  storeConfig().then(storeConfig => {
    const configureStore = storeConfig.default;
    render(
      <ReduxProvider store={configureStore(initState)}>
        <AppContext.Provider value={{ locale }}>
          <LayoutProvider />
          <App />
        </AppContext.Provider>
      </ReduxProvider>,
      document.getElementById('app')
    );
  });
});
