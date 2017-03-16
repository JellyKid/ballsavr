import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import store from './redux/store';

import './style/bs.css';
import './style/custom.css';
import './assets/nomangle/app_icon.png';

import Routes from './Routes';


const app = (
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes(store.dispatch)} />
  </Provider>
);

render(
  app,
  document.getElementById('app')
);
