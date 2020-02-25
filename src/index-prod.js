import React from 'react';
import { render } from 'react-dom';
// import { HashRouter as Router } from "react-router-dom";
// TODO: Use HashRouter for Electron and BrowserRouter for web
import { HashRouter, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index-prod.css';

import App from './components/App';
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
import ProofOfConceptPage from './components/poc/ProofOfConcept';

// Todo: pass an init state into the below function
const store = configureStore();

// TODO: Use HashRouter for Electron and BrowserRouter for web
const Router =
  process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter;

render(
  <ReduxProvider store={store}>
    <ProofOfConceptPage />
  </ReduxProvider>,
  document.getElementById('app')
);