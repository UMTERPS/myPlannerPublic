import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.less';
import App from './components/App';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import LayoutProvider, { initLayout } from './providers/LayoutProvider';
import { initState } from './redux/reducers/initState';
import { AppContext } from './context/AppContext';
import initI18n, { setLocale } from './services/LocaleService';

const storeConfig = () => {
  return process.env.NODE_ENV === 'production'
    ? import('./redux/configureStore.prod')
    : import('./redux/configureStore.dev');
};

initState.layout = initLayout();
// get locale info from electron renderer browser navigator
const locale = window.navigator.language;

// send locale info back to electron main process
setLocale(locale);
// init i18next with the locale string
initI18n(locale);

storeConfig().then(storeConfig => {
  const configureStore = storeConfig.default;
  render(
    <ReduxProvider store={configureStore(initState)}>
      <Router>
        <AppContext.Provider value={{ locale }}>
          <LayoutProvider />
          <App />
        </AppContext.Provider>
      </Router>
    </ReduxProvider>,
    document.getElementById('app')
  );
});
