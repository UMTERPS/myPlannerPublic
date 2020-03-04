import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.less';

import App from './components/App';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import LayoutProvider from './providers/LayoutProvider';
import { registerListeners } from './providers/IpcListenerProviders';

// Todo: pass an init state into the below function
const store = configureStore();

render(
  <ReduxProvider store={store}>
    <LayoutProvider />
    <App />
  </ReduxProvider>,
  document.getElementById('app')
);

registerListeners();
