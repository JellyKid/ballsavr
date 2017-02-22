import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import store from './redux/store';

import './style/bs.css';
import './style/custom.css';

// import Admin from './components/Admin.jsx';
import Routes from './Routes';

const app = (
  <Provider store={store}>
    <Router history={browserHistory} routes={Routes} />
  </Provider>
);

render(
  app,
  document.getElementById('app')
);
