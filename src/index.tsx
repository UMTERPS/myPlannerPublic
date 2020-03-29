import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.less';
// import configureStore from './redux/configureStore.dev';
import App from './components/App';
import { Provider as ReduxProvider } from 'react-redux';
import LayoutProvider, { initLayout } from './providers/LayoutProvider';
import { initState } from './redux/reducers/initState';

const storeConfig = () => {
  return process.env.NODE_ENV === 'production'
    ? import('./redux/configureStore.prod')
    : import('./redux/configureStore.dev');
};

initState.layout = initLayout();

storeConfig().then(storeConfig => {
  const configureStore = storeConfig.default;
  render(
    <ReduxProvider store={configureStore(initState)}>
      <LayoutProvider />
      <App />
    </ReduxProvider>,
    document.getElementById('app')
  );
});
