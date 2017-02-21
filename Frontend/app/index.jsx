import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux/store';

import './style/bs.css';
import './style/custom.css';

import User from './components/user/User.jsx';

const App = (
  <div className="mainApp">
    <User />
  </div>
);

render(
  <Provider store={store}>
    {App}
  </Provider>,
  document.getElementById('app')
);
